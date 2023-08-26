import { configureStore } from "@reduxjs/toolkit";
import NotesSlice from "./Reducer/NotesSlice";


export default configureStore({
    reducer:{
        notes:NotesSlice
    }
})