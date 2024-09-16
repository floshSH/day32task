import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Slice/ToDoSlice";

const store = configureStore({
    reducer:{
        cart :cartReducer,
    }
})
export default store;