import { createSlice } from "@reduxjs/toolkit";



export const NotesSlice=createSlice({
    name:"NoteSlice",
    initialState:{
        item:[]
    },
    reducers:{
        noteData:(state,action)=>{
            state.item=action.payload
          },
          addnewData:(state,action)=>{
              state.item=[...state.item,action.payload]
          },
          editOldData:(state,action)=>{
              const filterData=state.item.filter(d=>d.id!=action.payload.id)
              state.item=[...filterData,action.payload]
          },
          deleteOldData:(state,action)=>{
              const filterData=state.item.filter(d=>d.id!=action.payload.id)
              state.item=[...filterData]
          }
    }

})

export const {noteData,addnewData,editOldData,deleteOldData}=NotesSlice.actions
export default NotesSlice.reducer