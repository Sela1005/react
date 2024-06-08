import React from 'react'
import './login.scss'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  //btn login
  const registerOnClick = () => {
    navigate("/register");
  };
  return (
    <div className="body_login">
    <div className="wrapper">
    <h2>LOGIN</h2>
    <form action="#">
        <div className="input-field">
            <input type="email" id='email' placeholder='Username' required/>
            <i className='bx bxs-user'></i>
        </div>
        <div className="input-field">
            <input type="password" id='password' placeholder='Password' required/>
            <i className='bx bxs-user'></i>
        </div>
        <a href="" className='forgot'>
            <p>Forgot Password?</p>
        </a>
        <button type='submit' className='login'>Login</button>
        <p className='noAccount'>Không có tài khoản? <a href="#" className='sign-up' onClick={registerOnClick}>sign up</a></p>
    </form>
  </div>
  </div>
  )
}

export default Login