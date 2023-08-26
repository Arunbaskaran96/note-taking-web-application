import React, { useRef } from 'react'
import "./Addnote.css"
import {useDispatch} from "react-redux"
import { addnewData } from '../../Redux/Reducer/NotesSlice'

function Addnote() {
  const addDispatch=useDispatch()
    const title=useRef(null)
    const content=useRef(null)
    const clickHandler=(e)=>{
      if(title!=null){
        e.preventDefault()
        const newData={
          title:title.current.value,
          content:content.current.value
        }
        addDispatch(addnewData(newData))
      }
      alert("Successfully added")
      title.current.value=null
      content.current.value=null
    }
    return (
      <div className='addnoteWrapper'>
          <form className='addnoteMiniContainer' onSubmit={clickHandler}>
            <>
              <label className='addNoteLabel'>Title : </label>
              <input ref={title} placeholder='enter your title here..' className='addNoteInput'/><br/>
              </>
              <>
              <label className='addNoteLabel'>Content : </label>
              <input ref={content} placeholder='enter your content here..' className='addNoteInput'/><br/>
              </>
              <button className='addNoteButton'>Add note</button>
          </form>
      </div>
  )
}

export default Addnote