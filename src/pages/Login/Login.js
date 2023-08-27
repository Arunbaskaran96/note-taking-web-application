import React, { useEffect, useRef, useState } from 'react'
import "./Login.css"
import { Link, json, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../../Redux/Reducer/NotesSlice'

function Login() {
  const email=useRef(null)
  const password=useRef(null)
  const nav=useNavigate()
  const [disable,setDisable]=useState(false)
  const userDispatch=useDispatch()

  useEffect(()=>{
    email.current.focus()
  },[])

  const submitHandler=async(e)=>{
    try {
      setDisable(true)
      e.preventDefault()
      const userData={
        email:email.current.value,
        password:password.current.value
      }
      const {data}=await axios.post("https://note-taking-api-8e7j.onrender.com/api/users/login",userData)
      window.localStorage.setItem("user",JSON.stringify(data))
      userDispatch(addUser(data))
      nav("/homepage")
      setDisable(false)
    } catch (error) {
      alert("Incorrect Username/password")
      setDisable(false)
      console.log(error)
    }
  }
  return (
    <div className='loginWrapper'>
      <div className='loginCard'>
      <div>
        <img className='loginImage' src='https://blog.cuw.edu/wp-content/uploads/note-methods-e1629911426304.jpg' alt='loginImage'/>
      </div>
      <div>
        
      <form className='loginRightside' onSubmit={submitHandler}>
          <label className='loginLabel'>Email </label><br/>
          <input ref={email} type='email' className='loginInput'/><br/>
          <label className='loginLabel'>Password </label><br/>
          <input ref={password}  type='password' className='loginInput'/><br/>
          <button disabled={disable} className={!disable ? "loginButton" :"loginButtonDiable"}>Login</button>
        </form>
        <div className='loginRightBottom'>
        <Link to="/register" className='RgisterButton'>Register</Link>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Login