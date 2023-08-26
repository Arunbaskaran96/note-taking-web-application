import React, { useState } from 'react'
import "./Viewnote.css"
import Topbar from '../topbar/Topbar'


function Viewnote() {
    const [note,setNote]=useState()


    /* for formating date*/ 
    // const date=new Date(note.createdAt)
    // const f=new Intl.DateTimeFormat("en-us",{
    //     dateStyle:"full"
    // })
  return (
    <div className='viewnoteWrapper'>
        <Topbar/>
        <div>
            <button className='backButton'>Back</button>
        </div>
        <div className='viewnoteTop'>
            <h3 className='viewnoteTitle'>{note.title}</h3>
            {/* <h5 className='viewnoteCreatedAt'>Created At : <span>{f.format()}</span></h5> */}
        </div>
        <div className='viewnoteBottom'>
            <img className='viewnoteimage' src="" alt='viewNoteImg'/>
            <p className='viewnoteContent'></p>
        </div>
    </div>
  )
}

export default Viewnote