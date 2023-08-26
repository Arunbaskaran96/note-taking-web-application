import React, { useRef } from 'react'
import "./Register.css"
import axios from 'axios'
import { useNavigate } from 'react-router'
function Register() {
  const username=useRef(null)
  const email=useRef(null)
  const password=useRef(null)
  const city=useRef(null)
  const nav=useNavigate()

  const registerHandler=async(e)=>{
    e.preventDefault()
    try {
      const newUser={
        username:username.current?.value,
        email:email.current?.value,
        password:password.current?.value,
        city:city.current?.value
      }
      await axios.post("http://localhost:8000/api/users/",newUser)
      alert("Successfully Registered")
      nav("/")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='registerWrapper'>
      <form onSubmit={registerHandler}>
        <label className='registerLabel'>User Name :</label><br/>
        <input ref={username} className='registerInput' type='text'/><br/>
        <label className='registerLabel'>Email : </label><br/>
        <input ref={email} className='registerInput' type='email'/><br/>
        <label className='registerLabel'>Password :</label><br/>
        <input ref={password} className='registerInput' type='password'/><br/>
        <label className='registerLabel'>City : </label><br/>
        <input ref={city} className='registerInput' type='text'/><br/>
        <input  className='registerInput registerButton' value="submit" type='submit'/>
      </form>
    </div>
  )
}

export default Register