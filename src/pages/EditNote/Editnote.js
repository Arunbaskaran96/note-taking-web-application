import React, { useEffect, useState } from 'react'
import "./Editnote.css"
import Topbar from '../../components/topbar/Topbar'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { editOldData } from '../../Redux/Reducer/NotesSlice'

function Editnote() {
    const nav=useNavigate()
    const [disable,setDisable]=useState(false)
    const params=useParams()
    const editDispatch=useDispatch()
    const formik=useFormik({
        initialValues:{
            _id:params.id,
            title:"",
            content:"",
            image:null
        },
        validate:()=>{},
        onSubmit:async(value)=>{
            setDisable(false)
            try {
                setDisable(true)
                await axios.put(`http://localhost:8000/api/notes/updatenote/${params.id}`,value)
                alert("Updated Successfully")
                nav("/homepage")
            } catch (error) {
                setDisable(false)
                console.log(error)
            }
            nav("/homepage")
        }
    })
    useEffect(()=>{
        const getNote=async()=>{
            try {
                const {data}=await axios.get(`https://note-taking-api-8e7j.onrender.com/api/notes/note/${params.id}`)
                formik.setValues(data)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        getNote()
    },[])
  return (
    <div className='editWrapper'>
        <Topbar/>
        <div className='backBtnContainer'>
            <Link to="/homepage" className='backButton'>Back</Link>
        </div>
        <div className='editContainer'>
        <form className='editMinicontainer' onSubmit={formik.handleSubmit}>
            <label className='editNoteLabel'>Title :</label><br/>
            <input value={formik.values.title} onChange={formik.handleChange} name='title' className='editNoteInput' type='text'/><br/>
            <label className='editNoteLabel'>Content :</label><br/>
            <textarea  value={formik.values.content} onChange={formik.handleChange} name='content' className='editNoteTextArea'></textarea><br/>
            <label className='editNoteLabel'>Image :</label><br/>
            <input  name='image' onChange={formik.handleChange} type='file'/><br/>
            <span>{formik.values.image}</span><br/>
            <input disabled={disable} type='submit' value="update" className={!disable ? 'updateButton' :"updateDisableButton" } />
        </form>
        </div>
    </div>
  )
}

export default Editnote