import { User } from "@/app/types/definitions";
import { createSlice } from "@reduxjs/toolkit";

interface ProfileState {
    user: User | null;
    token: string | null;
}

const initialState: ProfileState = {
    user: null,
    token: null,
};

export const profileReducer = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.user = action.payload['profile'];
        },
        setToken: (state, action) => {
            state.token = action.payload['token']
        }
    }
})

export const { setProfile, setToken } = profileReducer.actions

export default profileReducer.reducer