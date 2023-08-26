import React, { useState} from 'react'
import "./Homepage.css"
import Topbar from '../../components/topbar/Topbar'
import Addnote from '../../components/addnote/Addnote'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOldData } from '../../Redux/Reducer/NotesSlice'


function Homepage() {
    const [search,setSearch]=useState("")
    const deleteDispath=useDispatch()
    const data=useSelector(state=>state.notes.item)

    
    const [currentPage,setCurrentPage]=useState(1)
    const recordsPerPage=6
    const lastIndex=currentPage*recordsPerPage
    const firstIndex=lastIndex-recordsPerPage
    const records=data.slice(firstIndex,lastIndex)
    const npages=Math.ceil(data.length/recordsPerPage)
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


      const handleChange=(e)=>{
        e.preventDefault()
        setSearch(e.target.value)
      }
      

      const deleteHandler=(item)=>{
        deleteDispath(deleteOldData(item))
      }

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
          <div className='noteSearchContainer'>
            <input  onChange={handleChange} className='notesSearch' type='text' placeholder='search here based on notes title...'/>
          </div>
          <div className='notesContainer'>
          {
          records?.filter((item)=>item.title.toLowerCase().includes(search.toLocaleLowerCase())).map((item)=>{
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