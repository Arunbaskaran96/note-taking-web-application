import React, { useRef, useState } from 'react'
import "./Addnote.css"
import {useDispatch, useSelector} from "react-redux"
import { addnewData } from '../../Redux/Reducer/NotesSlice'
import axios from 'axios'

function Addnote() {
  const user=useSelector(state=>state.notes.user)
  const addDispatch=useDispatch()
  const[disable,setDiable]=useState(false)
    const title=useRef(null)
    const content=useRef(null)
    const [image,setImage]=useState(null)

    console.log(user)

    const clickHandler=async(e)=>{
      if(title!=null){
        setDiable(true)
        e.preventDefault()
        const newData={
          title:title.current.value,
          content:content.current.value,
        }
        if(image){
          const data=new FormData()
          const fileName=image.name
          data.append("file",image)
          data.append("name",fileName)
          newData.image=fileName
          try {
            await axios.post("https://note-taking-api-8e7j.onrender.com/api/upload",data)
            alert("Successfully added")
            addDispatch(addnewData(newData))
            title.current.value=null
            content.current.value=null
            setImage=null
  
            setDiable(false)
          } catch (error) {
            console.log(error)
          }
      }

      try {
        await axios.post(`https://note-taking-api-8e7j.onrender.com/api/notes/addnote/${user._id}`,newData)
      } catch (error) {
        console.log(error)
      }
    }
  }
    return (
      <div className='addnoteWrapper'>
          <form className='addnoteMiniContainer' onSubmit={clickHandler}>
            <div className='addnotecombo'>
              <label className='addNoteLabel'>Title : </label>
              <input ref={title} placeholder='enter your title here..' className='addNoteInput'/><br/>
              </div>
              <div className='addnotecombo'>
              <label className='addNoteLabel'>Content : </label>
              <input ref={content} placeholder='enter your content here..' className='addNoteInput'/><br/>
              </div>
              <div className='addnotecombo'>
              <label className='addNoteLabel'>Image : </label>
              <input className='fileinput' onChange={(e)=>setImage(e.target.files[0])}  type='file' accept='.png,.jpeg,.img,.jpg'/><br/>
              </div>
              <div className='addnotecombo'>
              <button disabled={disable} className={!disable ? 'addNoteButton' : "addNoteDisableButton"}>Add note</button>
              </div>
          </form>
      </div>
  )
}

export default Addnote