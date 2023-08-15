import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: ''

}

const updateDataSlice = createSlice({
    name: 'temp',
    initialState,
    reducers: {
        setTempDetails: (state, action) => {
            state.data = action.payload.data

        }
    }
})

export const { setTempDetails } = updateDataSlice.actions;
export default updateDataSlice.reducer;
