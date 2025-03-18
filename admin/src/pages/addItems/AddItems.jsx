import React, { useState } from 'react';
import './AddItems.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import uploadIcon from '../../assets/upload-icon-25.png'

function AddItems({url}) {
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
      setImage(file.name); 
      setPreviewImage(URL.createObjectURL(file)); 
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
    const fileInput = document.getElementById('image');
    const file = fileInput.files[0]; 

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", Number(data.price));
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("image",file);

    try {

      const response = await axios.post(`${url}/api/food/addItem`, formData)

      if (response.status === 201) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage('No file chosen');
        setPreviewImage(null);
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
     toast.error(error.message)
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
                <img src={uploadIcon} alt="" />
                <span>Browse files</span>
                <span>Drag and drop</span>
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

        <button type='submit' className='primary-button'>Add</button>
      </form>
    </div>
  );
}

export default AddItems;