import React from 'react'
import "./Homepage.css"
import Topbar from '../../components/topbar/Topbar'
import Addnote from '../../components/addnote/Addnote'

function Homepage() {
  return (
    <div className='homepageWrapper'>
        <div className='homebarTop'>
            <Topbar/>
        </div>
        <div className='homepageMiddle'>
          <Addnote/>
        </div>
    </div>
  )
}

export default Homepage