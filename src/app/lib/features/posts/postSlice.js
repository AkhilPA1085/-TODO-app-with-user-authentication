import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name:'posts',
    initialState:{
        post:[]
    },
    reducers:{
        setPost:(state,action)=>{
            state.post = action.payload
        },
    }
})

export const {setPost} = postSlice.actions

export default postSlice.reducer