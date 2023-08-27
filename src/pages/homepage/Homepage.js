import React, { useEffect, useState} from 'react'
import "./Homepage.css"
import Topbar from '../../components/topbar/Topbar'
import Addnote from '../../components/addnote/Addnote'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOldData, noteData } from '../../Redux/Reducer/NotesSlice'
import axios from 'axios'
import { Link } from 'react-router-dom'


function Homepage() {

    const [search,setSearch]=useState("")
    const deleteDispath=useDispatch()
    const dataDispatch=useDispatch()
    const [isLoading,setLoading]=useState(true)
    const data=useSelector(state=>state.notes.item)
    const user=useSelector(state=>state.notes.user)



    /*pagination*/
    const [currentPage,setCurrentPage]=useState(1)
    const recordsPerPage=6
    const lastIndex=currentPage*recordsPerPage
    const firstIndex=lastIndex-recordsPerPage
    const records=data?.slice(firstIndex,lastIndex)
    const npages=Math.ceil(data?.length/recordsPerPage)
    const numbers=[]
    for(let i=1;i<=npages;i++){
        numbers.push(i)
    }

    const prevPage=()=>{
        if(currentPage!==firstIndex){
            setCurrentPage(currentPage-1)
    }
    }
    const nextPage=()=>{
        if(currentPage!==lastIndex){
            setCurrentPage(currentPage+1)
    }
    }
    const changeCurrentPage=(id)=>{
        setCurrentPage(id)
    }


    useEffect(()=>{
      const getData=async()=>{
        try {
          setLoading(true)
          const notes=await axios.get(`https://note-taking-api-8e7j.onrender.com/api/notes/${user._id}`)
          dataDispatch(noteData(notes.data))
          // console.log(notes.data)
          setLoading(false)
        } catch (error) {
          console.log(error)
        }
      }
      getData()
    },[])


      const handleChange=(e)=>{
        e.preventDefault()
        setSearch(e.target.value)
      }
      

      const deleteHandler=async(item)=>{
        try {
          deleteDispath(deleteOldData(item))
          await axios.delete(`https://note-taking-api-8e7j.onrender.com/api/notes/${item._id}`)
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <div className='homepageWrappe'>
        <div className='homebarTop'>
            <Topbar/>
        </div>
        <div className='homepageMiddle'>
          <Addnote  />
        </div>
        <hr/>
        {
          isLoading ?
          <div className='loadingContainer'>Fetching Data....Please wait....</div>
          :
          <>
                  <div className='homePageBottom'>
          <div className='noteSearchContainer'>
            <input  onChange={handleChange} className='notesSearch' type='text' placeholder='search here based on notes title...'/>
          </div>
          <div className='notesContainer'>
          {
          records?.filter((item)=>item.title.toLowerCase().includes(search.toLocaleLowerCase())).map((item,_id)=>{
            const date=new Date(item.createdAt)
            const f=new Intl.DateTimeFormat("en-us",{
                dateStyle:"full"
            })
            return(
              <div  className='notesIndividualContainer' key={_id}>
                <div className='notesTop'>
                  <h5 className='noteTitle'>{item.title}</h5>
                  <span className='noteDate'>{f.format()}</span>
                </div>
                  <hr/>
                <div className='notesMiddle'>
                   <p className='noteContent'>{item.content}</p>
                </div>
                <hr/>
                <div className='notesBottom'>
                    <Link to={`/editnote/${item._id}`}  className='editButton'>Edit</Link>
                    <Link to={`/viewnote/${item._id}`} className='viewButton'>View</Link>
                    <button  onClick={()=>deleteHandler(item)} className='deleteButton'>Delete</button>
                </div>
              </div>
            )
          })
}
          </div>
        </div>
        <div>
            <ul className='pagination' >
                <li className='pageItem'>
                    <a onClick={prevPage} href="#" style={currentPage==1 ? {pointerEvents:"none"} : {pointerEvents:"all"}}  className='pageLink'>Prev</a>
                </li>
                {/* {`pageItem ${currentPage===n ? 'active' :''}?`}  */}
                {
                    numbers.map((n,i)=>{
                        return(
                            <li className="pageItem" key={i}>
                            <a href="#" onClick={()=>changeCurrentPage(n)} className={`${currentPage===n ? 'pageLink active' :'pageLink'}`}>{n}</a>
                        </li>
                        )
                    })
                }
                <li className='pageItem'>
                    <a onChange={nextPage}  style={currentPage==numbers.length ? {pointerEvents:"none"} : {pointerEvents:"all"}} href="#" className='pageLink'>Next</a>
                </li>
            </ul>
        </div>
          </>
        }
    </div>
  )
}

export default Homepage