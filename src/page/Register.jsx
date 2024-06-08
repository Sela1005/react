import React from 'react'
import './register.scss'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate();
  //btn login
  const loginOnclick = () => {
    navigate("/login");
  };
  return (
    <div className="body_register">
        <div className="wrapper">
        <h2>Đăng Ký</h2>
        <form action="#">
            <div className="input-field">
                <input type="email" id='email' placeholder='Username' required/>
                <i className='bx bxs-user'></i>
            </div>
            <div className="input-field">
                <input type="password" id='password' placeholder='Password' required/>
                <i className='bx bxs-user'></i>
            </div>
            <div className="input-field">
                <input type="password-again" id='password-again' placeholder='Password' required/>
                <i className='bx bxs-user'></i>
            </div>
            <button type='submit' className='register'>Đăng Ký</button>
            <p className='noAccount'>Đã có tài khoản? <a href="#" className='sign-up' onClick={loginOnclick}>Login</a></p>
        </form>
      </div>
      </div>
  )
}

export default Register