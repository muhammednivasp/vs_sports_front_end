import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    id: "",
    email: "",
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminDetails: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
        }
    }
})

export const { setAdminDetails } = adminSlice.actions;
export default adminSlice.reducer;
