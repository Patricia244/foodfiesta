import React, { useContext, useEffect, useState } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/Context';
import { ClipLoader } from 'react-spinners'; 
import axios from 'axios';

function Verify() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const { url } = useContext(StoreContext);
  const [loading, setLoading] = useState(true); 
  const [message, setMessage] = useState('');
const navigate = useNavigate()
  
    const verifyOrder = async () => {
      try {
        const response = await axios.post(`${url}/api/order/verify`, {
          orderId,
          success,
        });

        if (response.data.success) {
        navigate('/myOrders')
          setMessage('Order verified successfully!');
        } else {
        navigate("/")
          setMessage('Failed to verify order. Please contact support.');
        }
      } catch (error) {
        console.error('Error verifying order:', error);
        setMessage('An error occurred while verifying your order.');
      } finally {
        setLoading(false);
      }
    };
    useEffect(()=>{
      verifyOrder()
    },[])

    if (orderId && success) {
      verifyOrder();
    } else {
      setMessage('Invalid order details.');
      setLoading(false);
    }


  return (
    <div className='verify'>
      {loading ? (
        <div className="spinner">
          <ClipLoader color="#36d7b7" size={50} />
          <p>Verifying your order...</p>
        </div>
      ) : (
        <div className="message">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default Verify;