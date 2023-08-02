import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    id: "",
    email: "",
    isUser: "",
    clubRegisterNo: "",
    location: "",
    name: ""
}

const clubSlice = createSlice({
    name: 'club',
    initialState,
    reducers: {
        setClubDetails: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.isUser = action.payload.isUser;
            state.clubRegisterNo = action.payload.clubRegisterNo;
            state.location = action.payload.location;
            state.name = action.payload.name;

        }
    }
})

export const { setClubDetails } = clubSlice.actions;
export default clubSlice.reducer;
