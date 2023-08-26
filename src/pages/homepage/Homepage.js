import React, { useState } from 'react'
import "./Homepage.css"
import Topbar from '../../components/topbar/Topbar'
import Addnote from '../../components/addnote/Addnote'


function Homepage() {

    const [data,setData]=useState([
        {
          id:1,
          title:"abc",
          content:"lorem dsfh  dsfug jksdf jhdsf jhdsg sdjkg hdg zc "
        },
        {
          id:2,
          title:"sf",
          content:"lorem dsfh  dsfug jksdf jhdsf jhdsg sdjkg hdg zc "
        },
        {
          id:3,
          title:"ggv",
          content:"lorem dsfh  dsfug jksdf jhdsf jhdsg sdjkg hdg zc "
        }
      ])


  return (
    <div className='homepageWrapper'>
        <div className='homebarTop'>
            <Topbar/>
        </div>
        <div className='homepageMiddle'>
          <Addnote data={data}  />
        </div>
        <hr/>
        <div className='homePageBottom'>

          <div className='notesContainer'>
          {
          data?.map((item)=>{
            return(
              <div  className='notesIndividualContainer'>
                <div className='notesTop'>
                  <h5 className='noteTitle'>{item.title}</h5>
                  <span className='noteDate'>25-08-2023</span>
                </div>
                  <hr/>
                <div className='notesMiddle'>
                   <p className='noteContent'>{item.content}</p>
                </div>
                <hr/>
                <div className='notesBottom'>
                    <button className='editButton'>Edit</button>
                    <button className='deleteButton'>Delete</button>
                </div>
              </div>
            )
          })
}
          </div>
        </div>
    </div>
  )
}

export default Homepage