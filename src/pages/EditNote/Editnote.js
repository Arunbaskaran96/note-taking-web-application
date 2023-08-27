import React, { useEffect } from 'react'
import "./Editnote.css"
import Topbar from '../../components/topbar/Topbar'
import { useFormik } from 'formik'
import axios from 'axios'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

function Editnote() {
    const params=useParams()
    const formik=useFormik({
        initialValues:{
            title:"",
            content:"",
            image:null
        },
        validate:()=>{},
        onSubmit:()=>{}
    })
    useEffect(()=>{
        const getNote=async()=>{
            try {
                const {data}=await axios.get(`http://localhost:8000/api/notes/note/${params.id}`)
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
        <div className='editMinicontainer'>
            <label className='editNoteLabel'>Title :</label><br/>
            <input value={formik.values.title} onChange={formik.handleChange} name='title' className='editNoteInput' type='text'/><br/>
            <label className='editNoteLabel'>Content :</label><br/>
            <textarea  value={formik.values.content} onChange={formik.handleChange} name='content' className='editNoteTextArea'></textarea><br/>
            <label className='editNoteLabel'>Image :</label><br/>
            <input  name='image' onChange={formik.handleChange} type='file'/><br/>
            <span>{formik.values.image}</span><br/>
            <input type='submit' value="update" className='updateButton' />
        </div>
        </div>
    </div>
  )
}

export default Editnote