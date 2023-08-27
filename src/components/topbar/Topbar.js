import React from 'react'
import "./Topbar.css"
import { useNavigate } from 'react-router'

function Topbar() {
  const nav=useNavigate()
  const logoutHandler=()=>{
    window.localStorage.removeItem("user")
    nav("/")
  }
  return (
    <div className='topbarWrapper'>
        <div className='topbaarLeft'>
            <img className='appImage' src='https://play-lh.googleusercontent.com/SSfdrsYOqMDON_xDac86U0uV5SEwevg6L4R0QPNsAox6QnF7RQgCJwReI1P3FUSepPfi' alt='appLogo'/>
            <h4 className='appNameText'>Note App</h4>
        </div>
        <div className='topbarRight'>
            <h5 className='userName'>Arun</h5>
            <button onClick={logoutHandler} className='topbarButton'>Log out</button>
        </div>
    </div>
  )
}

export default Topbar