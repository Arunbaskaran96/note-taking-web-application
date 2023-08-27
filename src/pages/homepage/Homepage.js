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
    const data=useSelector(state=>state.notes.item)
    const user=useSelector(state=>state.notes.user)


    
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
          const notes=await axios.get(`http://localhost:8000/api/notes/${user._id}`)
          dataDispatch(noteData(notes.data))
          // console.log(notes.data)
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
          await axios.delete(`http://localhost:8000/api/notes/${item._id}`)
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <div className='homepageWrapper'>
        <div className='homebarTop'>
            <Topbar/>
        </div>
        <div className='homepageMiddle'>
          <Addnote  />
        </div>
        <hr/>
        <div className='homePageBottom'>
          <div className='noteSearchContainer'>
            <input  onChange={handleChange} className='notesSearch' type='text' placeholder='search here based on notes title...'/>
          </div>
          <div className='notesContainer'>
          {
          records?.filter((item)=>item.title.toLowerCase().includes(search.toLocaleLowerCase())).map((item,_id)=>{
            return(
              <div  className='notesIndividualContainer' key={_id}>
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
                    <Link to={`/editnote/${item._id}`}  className='editButton'>Edit</Link>
                    <Link to={`/viewnote/${item._id}`} className='viewButton'>View</Link>
                    <button onClick={()=>deleteHandler(item)} className='deleteButton'>Delete</button>
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
                    <a onClick={prevPage} href="#" className='pageLink'>Prev</a>
                </li>
                {
                    numbers.map((n,i)=>{
                        return(
                            <li className={`pageItem ${currentPage===n ? 'active' :''}?`} key={i}>
                            <a href="#" onClick={()=>changeCurrentPage(n)} className='pageLink'>{n}</a>
                        </li>
                        )
                    })
                }
                <li className='pageItem'>
                    <a onChange={nextPage} href="#" className='pageLink'>Next</a>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Homepage