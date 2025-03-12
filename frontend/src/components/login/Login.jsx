import React,{useState} from 'react'
import "./Login.css"
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function Login({setShowLogin}) {
  const [currentState, setCurrentState] = useState("Login")
  return (
    <div className='login-form-container'>
      <form className='login-form'>
        <div className="login-title">
          <h2>{currentState}</h2>
          <CloseOutlinedIcon className="close-icon" onClick={()=>setShowLogin(false)}/>
        </div>
        <div className='login-inputs'>
          {currentState ==="Login"?
          <></>:<input type='text' placeholder='Username' required/>}
          <input type='email' placeholder='Email' required/>
          <input type='password' placeholder='Password' required/>
        </div>
        <button className='login-btn'>{currentState ==="Sign up"?"Create account":"Login"}</button>
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
