import React, { useState } from 'react';
import './AddItems.css';
import axios from 'axios';

function AddItems() {
  const url = "http://localhost:4000/api/food"; // Corrected URL
  const [image, setImage] = useState('No file chosen');
  const [previewImage, setPreviewImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file.name); // Set the filename for display
      setPreviewImage(URL.createObjectURL(file)); // Set the preview image
    } else {
      setImage('No file chosen');
      setPreviewImage(null);
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById('image'); // Get the file input element
    const file = fileInput.files[0]; 

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", Number(data.price));
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("image",file);

    try {

      const response = await axios.post(`http://localhost:4000/api/food/addItem`, formData)

      if (response.status === 201) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage('No file chosen');
        setPreviewImage(null);
        alert("Item added successfully!");
      } else {
        alert("Failed to add item. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert("An error occurred. Please check your network connection and try again.",error.message);
    }
  };

  return (
    <div className='add-item-container'>
      <form className='form' onSubmit={onSubmitHandler}>
        <div className="add-product-name">
          <p>Product name</p>
          <input
            type='text'
            placeholder='Type here'
            name='name'
            onChange={onChangeHandler}
            value={data.name}
            required
          />
        </div>

        <div className="upload-image">
          <p>Upload image</p>
          <label htmlFor="image" className="file-upload-label">
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="image-preview" />
            ) : (
              <div className="upload-placeholder">
                <span>Click to upload or drag and drop</span>
                <span>PNG, JPG, or JPEG (Max 5MB)</span>
              </div>
            )}
            <input
              type='file'
              id='image'
              hidden
              required
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/jpg"
            />
          </label>
          <span className="file-name">{image}</span>
        </div>

        <div className="add-category-price">
          <div>
            <p>Product category</p>
            <select name="category" onChange={onChangeHandler} value={data.category} required>
              <option value="Burger">Burger</option>
              <option value="Pizza">Pizza</option>
              <option value="Salad">Salad</option>
              <option value="Sushi">Sushi</option>
              <option value="Pasta">Pasta</option>
            </select>
          </div>
          <div className='add-price'>
            <p>Product Price</p>
            <input
              type='number'
              name="price"
              placeholder='Write product price'
              onChange={onChangeHandler}
              value={data.price}
              required
            />
          </div>
        </div>

        <div className="add-product-description">
          <p>Product description</p>
          <textarea
            name='description'
            rows='6'
            placeholder='Write content here'
            onChange={onChangeHandler}
            value={data.description}
            required
          ></textarea>
        </div>

        <button type='submit' className='add-button'>Add</button>
      </form>
    </div>
  );
}

export default AddItems;