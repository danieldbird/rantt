import React, { useRef, useState } from 'react';
import firebase from '../../Shared/Auth/Database/Firebase';
import { v4 as uuidv4 } from 'uuid';

function AddProduct() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState({});

  const fileInputRef = useRef();

  function clearData() {
    setTitle('');
    setPrice('');
    setQuantity('');
    setImage({});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const uuid = uuidv4();
    firebase
      .storage()
      .ref()
      .child(`product-images/${uuid}`)
      .put(image)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((image_url) => {
          firebase
            .firestore()
            .collection('products')
            .add({
              title,
              price,
              quantity,
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
        clearData();
        fileInputRef.current.value = '';
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="add-product">
      <div className="container">
        <h1>Add Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Title"
                name="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
                required
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="number"
                step="0.01"
                placeholder="Price"
                name="price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                value={price}
                required
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="number"
                placeholder="Quantity"
                name="quantity"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                value={quantity}
                required
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Image</label>
              <input
                className="input"
                type="file"
                accept="image/*"
                name="image"
                id="image"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                ref={fileInputRef}
                required
              />
            </div>
          </div>
          <button type="submit">Save Product</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
