import { createSlice } from "@reduxjs/toolkit";

export const profileReducer = createSlice({
    name:'profile',
    initialState:{
        user:null,
        token:null,
    },
    reducers:{
        setProfile:(state,action)=>{
            state.user = action.payload['profile'];
        },
        setToken:(state,action)=>{
            state.token = action.payload['token']
        }
    }
})

export const {setProfile,setToken} = profileReducer.actions

export default profileReducer.reducer