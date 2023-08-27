import { createSlice } from "@reduxjs/toolkit";



export const NotesSlice=createSlice({
    name:"NoteSlice",
    initialState:{
        item:[],
        user:{}
    },
    reducers:{
        noteData:(state,action)=>{
            state.item=action.payload
          },
          addnewData:(state,action)=>{
              state.item=[...state.item,action.payload]
          },
          editOldData:(state,action)=>{
              const filterData=state.item.filter(d=>d.id!=action.payload._id)
              state.item=[...filterData,action.payload]
          },
          deleteOldData:(state,action)=>{
              const filterData=state.item.filter(d=>d._id!=action.payload._id)
              state.item=[...filterData]
          },
          addUser:(state,action)=>{
            state.user=action.payload
          }
    }

})

export const {noteData,addnewData,editOldData,deleteOldData,addUser}=NotesSlice.actions
export default NotesSlice.reducer