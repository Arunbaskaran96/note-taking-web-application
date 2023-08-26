import { createSlice } from "@reduxjs/toolkit";



export const NotesSlice=createSlice({
    name:"NoteSlice",
    initialState:{
        item:[
            {
              id:1,
              title:"abc",
              content:"lorem dsfh  dsfug jksdf jhdsf jhdsg sdjkg hdg zc "
            },
            {
              id:2,
              title:"sf",
              content:"lorem dsfh  dsfug jksdf jhdsf jhdsg sdjkg hdg zc "
            },
            {
              id:3,
              title:"ggv",
              content:"lorem dsfh  dsfug jksdf jhdsf jhdsg sdjkg hdg zc "
            },
            {
                id:1,
                title:"abc",
                content:"lorem dsfh  dsfug jksdf jhdsf jhdsg sdjkg hdg zc "
              },
              {
                id:2,
                title:"sf",
                content:"lorem dsfh  dsfug jksdf jhdsf jhdsg sdjkg hdg zc "
              },
              {
                id:3,
                title:"ggv",
                content:"lorem dsfh  dsfug jksdf jhdsf jhdsg sdjkg hdg zc "
              },
              {
                id:1,
                title:"abc",
                content:"lorem dsfh  dsfug jksdf jhdsf jhdsg sdjkg hdg zc "
              },
              {
                id:2,
                title:"sf",
                content:"lorem dsfh  dsfug jksdf jhdsf jhdsg sdjkg hdg zc "
              },
              {
                id:3,
                title:"ggv",
                content:"lorem dsfh  dsfug jksdf jhdsf jhdsg sdjkg hdg zc "
              },
              {
                id:1,
                title:"abc",
                content:"lorem dsfh  dsfug jksdf jhdsf jhdsg sdjkg hdg zc "
              },
              {
                id:2,
                title:"sf",
                content:"lorem dsfh  dsfug jksdf jhdsf jhdsg sdjkg hdg zc "
              },
              {
                id:3,
                title:"ggv",
                content:"lorem dsfh  dsfug jksdf jhdsf jhdsg sdjkg hdg zc "
              }
          ]
    },
    reducers:{
        data:(state,action)=>{
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

export const {data,addnewData,editOldData,deleteOldData}=NotesSlice.actions
export default NotesSlice.reducer