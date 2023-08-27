import React, { useEffect, useState } from 'react'
import "./Viewnote.css"
import Topbar from '../topbar/Topbar'
import { useParams } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router-dom'


function Viewnote() {
    const params=useParams()
    const [note,setNote]=useState({})


    useEffect(()=>{
        const getIndividualNote=async()=>{
            try {
                const {data}=await axios.get(`https://note-taking-api-8e7j.onrender.com/api/notes/note/${params.id}`)
                setNote(data)
            } catch (error) {
                console.log(error)
            }
        }
        getIndividualNote()
    },[])


    /* for formating date*/ 
    const date=new Date(note.createdAt)
    const f=new Intl.DateTimeFormat("en-us",{
        dateStyle:"full"
    })
  return (
    <div className='viewnoteWrapper'>
        <Topbar/>
        <div className='backBtnContainer'>
            <Link to="/homepage" className='backButton'>Back</Link>
        </div>
        <div className='viewnoteTop'>
            <h3 className='viewnoteTitle'>{note.title}</h3>
            <h5 className='viewnoteCreatedAt'>Created At : <span>{f.format()}</span></h5>
        </div>
        <div className='viewnoteBottom'>
            <img className='viewnoteimage' src={`https://note-taking-api-8e7j.onrender.com//images/${note.image}`} alt='viewNoteImg'/>
            <p className='viewnoteContent'>{note.content}</p>
        </div>
    </div>
  )
}

export default Viewnote