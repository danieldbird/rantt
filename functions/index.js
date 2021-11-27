const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const stripe = require('stripe')(
  'sk_test_51JJ4axEHgnFkYDwPN7ZYt9b2FiPWWaSV2HadzgsinWjpWdv52en9ZBaOAfdxS3zU2gl4MLzdlKTUBRuHh5zKUUxy00Yenn4a20'
);

const app = express();

firebase.initializeApp();

app.use(cors({ origin: true }));

app.use(morgan('dev'));

app.post('/create-checkout-session', async (req, res) => {
  try {
    // get all products
    const allProducts = await firebase
      .firestore()
      .collection('products')
      .get()
      .then((docs) => {
        let items = [];
        docs.forEach((doc) => {
          items.push({
            id: doc.id,
            price_data: {
              currency: 'nzd',
              product_data: {
                name: doc.data().title,
              },
              unit_amount: doc.data().price,
            },
            quantity: 1,
          });
        });
        return items;
      });
    const items = allProducts.filter((product) => {
      return req.body.cart.includes(product.id);
    });

    items.forEach((item) => {
      delete item.id;
    });

    console.log(items);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000',
    });

    res.redirect(303, session.url);
  } catch (error) {
    console.log(error);
  }
});

exports.app = functions.https.onRequest(app);
