import React, { useEffect, useState } from 'react';
import './List.css'; // Import the CSS file
import axios from 'axios';
import { toast } from 'react-toastify';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { CircleLoader } from 'react-spinners';

function List({url}) {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/listItems`);
      if (response.status === 200) {
        setList(response.data || []); 
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeItem = async (id) => {
    try {
      const response = await axios.post(`${url}/api/food/deleteItem?id=${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <h1>Food list</h1>
      {Array.isArray(list) && list.length > 0 ? ( <div className="list-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(list) && list.length > 0 ? (
              list.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img src={`${url}/uploads/${item.image}`} alt={item.name} className="food-image" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>R{item.price}</td>
                  <td>
                    < CancelOutlinedIcon onClick={() => removeItem(item._id)}/>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
        
      </div>
      ) : (
        <div className="spinner">
            <CircleLoader color="#2a2438" size={50} />
        </div>
      )}
    </div>
  );
}

export default List;