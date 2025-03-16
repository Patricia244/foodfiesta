import React,{useState} from 'react'
import "./Login.css"
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useContext } from 'react';
import { StoreContext } from '../../context/Context';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({setShowLogin}) {
  const [currentState, setCurrentState] = useState("Login")
  const {url,setToken} = useContext(StoreContext)
  const [data, setData] = useState({
    userName:'',
    email:'',
    password:''
  })

  const onChangeHandler = (event)=>{
const { name, value } = event.target;
setData((prevData) => ({ ...prevData, [name]: value }));
  }
  const onLogin = async (event)=>{
    event.preventDefault()
    let newUrl = url
 if(currentState ==="Login"){
    newUrl += `/api/user/login`
 }else{
      newUrl += '/api/user/register'
 }
 try {
  const response = await axios.post(newUrl, data)
  if(response.status ===200){
    setToken(response.data.token)
    localStorage.setItem("token",response.data.token)
    setShowLogin(false)
  }else{
    toast.error(response.data.message)
  }
  
} catch (error) {
  toast.error(error.message)
}
  }
  return (
    <div className='login-form-container'>
      <form className='login-form' onSubmit={onLogin}>
        <div className="login-title">
          <h2>{currentState}</h2>
          <CloseOutlinedIcon className="close-icon" onClick={()=>setShowLogin(false)}/>
        </div>
        <div className='login-inputs'>
          {currentState ==="Login"?
          <></>:<input type='text' placeholder='Username' name='userName' onChange ={onChangeHandler} value={data.userName} required/>}
          <input type='email' placeholder='Email' required name='email' onChange={onChangeHandler} value={data.email}/>
          <input type='password' placeholder='Password' required name='password' onChange={onChangeHandler} value={data.password}/>
        </div>
        <button type='submit' className='login-btn'>{currentState ==="Sign up"?"Create account":"Login"}</button>
      <div className="login-condition">
        {currentState ==="Login"?
               <p>Create new account <span onClick={() => setCurrentState("Sign up")}>Click here</span></p>:
       <p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>

      }
      </div>
      </form>
    </div>
  )
}

export default Login
