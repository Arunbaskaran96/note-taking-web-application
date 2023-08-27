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
            await axios.post("http://localhost:8000/api/upload",data)
            addDispatch(addnewData(newData))
            title.current.value=null
            content.current.value=null
            setImage=null
            setDiable(false)
          } catch (error) {
            console.log(error)
          }
      }
      console.log(newData)
      try {
        alert("Successfully added")
        await axios.post(`http://localhost:8000/api/notes/addnote/${user._id}`,newData)
      } catch (error) {
        console.log(error)
      }
    }
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
              <>
              <label className='addNoteLabel'>Image : </label>
              <input onChange={(e)=>setImage(e.target.files[0])}  type='file' accept='.png,.jpeg,.img,.jpg'/><br/>
              </>
              <button disabled={disable} className='addNoteButton'>Add note</button>
          </form>
      </div>
  )
}

export default Addnote