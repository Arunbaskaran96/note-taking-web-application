import React, { useRef } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const email=useRef(null)
  const password=useRef(null)
  const nav=useNavigate()

  const submitHandler=async(e)=>{
    try {
      e.preventDefault()
      const userData={
        email:email.current.value,
        password:password.current.value
      }
      await axios.post("http://localhost:8000/api/users/login",userData)
      nav("/homepage")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='loginWrapper'>
      <div>
        <img className='loginImage' src='https://blog.cuw.edu/wp-content/uploads/note-methods-e1629911426304.jpg' alt='loginImage'/>
      </div>
      <div>
        <form className='loginRightside' onSubmit={submitHandler}>
          <label className='loginLabel'>Email </label><br/>
          <input ref={email} type='email' className='loginInput'/><br/>
          <label className='loginLabel'>Password </label><br/>
          <input ref={password}  type='password' className='loginInput'/><br/>
          <button className='loginButton'>Login</button>
        </form>
        <div className='loginRightBottom'>
        <Link to="/register" className='RgisterButton'>Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Login