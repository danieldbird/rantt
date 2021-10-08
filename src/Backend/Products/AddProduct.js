import React, { useEffect, useRef, useState } from 'react';
import firebase from '../../Shared/Auth/Database/Firebase';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router';

function AddProduct(props) {
  const history = useHistory();
  const [product, setProduct] = useState({
    id: '',
    title: '',
    price: '',
    quantity: '',
    image: {},
    image_name: '',
    imagePreview: '',
  });

  const isEditing = !!props.location.state;

  useEffect(() => {
    if (props.location.state) {
      const { product } = props.location.state;
      setProduct({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: product.quantity,
        image: {},
        image_name: product.image_name,
        imagePreview: product.image_url,
      });
    } else {
      setProduct({
        id: '',
        title: '',
        price: '',
        quantity: '',
        image: {},
        image_name: '',
        imagePreview: '',
      });
    }
  }, [props.location.state]);

  const fileInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const uuid = uuidv4();

    if (!isEditing) {
      // Adding new product, NOT editing.
      firebase
        .storage()
        .ref()
        .child(`product-images/${uuid}`)
        .put(product.image)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((image_url) => {
            firebase
              .firestore()
              .collection('products')
              .add({
                title: product.title,
                price: product.price,
                quantity: product.quantity,
                image_name: uuid,
                image_url,
              })
              .then(() => {
                console.log('Image saved.');
              })
              .catch((error) => {
                console.log(error);
              });
          });
        })
        .then(() => {
          console.log('Product saved.');
          history.push('/admin/products');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // EDITING
      // if there is no new image, just update the text items.
      if (!fileInputRef.current.files.length) {
        firebase
          .firestore()
          .collection('products')
          .doc(product.id)
          .update({
            title: product.title,
            price: product.price,
            quantity: product.quantity,
          })
          .then(() => {
            history.push('/admin/products');
          });
      } else {
        console.log('new image');
        firebase
          .storage()
          .ref()
          .child(`product-images/${product.image_name}`)
          .delete()
          .then(() => {
            firebase
              .storage()
              .ref()
              .child(`product-images/${uuid}`)
              .put(product.image)
              .then((snapshot) => {
                snapshot.ref.getDownloadURL().then((image_url) => {
                  firebase
                    .firestore()
                    .collection('products')
                    .doc(product.id)
                    .update({
                      title: product.title,
                      price: product.price,
                      quantity: product.quantity,
                      image_name: uuid,
                      image_url,
                    })
                    .then(() => {
                      history.push('/admin/products');
                    });
                });
              });
          });
      }
      // if there is a new image, delete the old one.

      // then add
      // then update using id
      console.log(fileInputRef.current.files.length);
    }
  };

  const handleChooseImage = (e) => {
    setProduct({
      ...product,
      image: e.target.files[0],
      imagePreview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleDelete = () => {
    if (window.confirm('Confirm delete?')) {
      firebase
        .firestore()
        .collection('products')
        .doc(product.id)
        .delete()
        .then(() => {
          firebase.storage().ref().child(`product-images/${product.image_name}`).delete();
        });
      history.push('/admin/products');
    } else {
      console.log('not deleted');
    }
  };

  return (
    <div className="list-products container">
      <h2 className="text-3xl text-gray-500 my-5">{isEditing ? 'Edit Product' : 'Add Product'}</h2>

      <form onSubmit={handleSubmit} className="flex flex-col md:w-1/2 mb-10">
        <div className="border rounded-lg my-2 p-2">
          <input
            className="w-full md:w-1/2"
            type="text"
            placeholder="Title"
            name="title"
            onChange={(e) => {
              setProduct({ ...product, title: e.target.value });
            }}
            value={product.title}
            required
          />
        </div>
        <div className="border rounded-lg my-2 p-2">
          <input
            className="w-full md:w-1/2"
            type="number"
            step="0.01"
            placeholder="Price"
            name="price"
            onChange={(e) => {
              setProduct({ ...product, price: e.target.value });
            }}
            value={product.price}
            required
          />
        </div>

        <div className="border rounded-lg my-2 p-2">
          <input
            className="w-full md:w-1/2"
            type="number"
            placeholder="Quantity"
            name="quantity"
            onChange={(e) => {
              setProduct({ ...product, quantity: e.target.value });
            }}
            value={product.quantity}
            required
          />
        </div>

        <div className="border rounded-lg my-2 p-2 text-white">
          <label className="text-gray-400">Image</label>
          <input
            className="flex mt-6 mb-4 text-gray-600"
            type="file"
            accept="image/*"
            name="image"
            id="image"
            onChange={handleChooseImage}
            ref={fileInputRef}
            required={isEditing ? false : true}
          />
          {product.image && product.imagePreview && (
            <img src={product.imagePreview} alt="product" id="image-preview" className="w-32" />
          )}
        </div>
        <button type="submit" className="bg-green-600 mt-5 px-2 py-2 rounded-lg text-white">
          {isEditing ? 'Edit Product' : 'Save Product'}
        </button>
        {isEditing && (
          <div className="flex">
            <button
              type="button"
              className="bg-red-500 my-5 mr-2 px-2 py-2 rounded-lg text-white w-1/2"
              onClick={handleDelete}
            >
              Delete Product
            </button>
            <button
              type="button"
              className="bg-yellow-400 my-5 ml-2 px-2 py-2 rounded-lg text-white w-1/2"
              onClick={() => {
                history.push('/admin/products');
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default AddProduct;
