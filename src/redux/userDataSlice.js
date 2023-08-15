import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    id: "",
    email: "",
    isUser: "",
    phoneNumber: "",
    name: "",
    isGoogle: ""

}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.isUser = action.payload.isUser;
            state.phoneNumber = action.payload.phoneNumber;
            state.name = action.payload.name;
            state.isGoogle = action.payload.isGoogle;

        }
    }
})

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
