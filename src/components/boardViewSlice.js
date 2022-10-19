import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: false,
}

export const boardViewSlice = createSlice({
    name: 'boardView',
    initialState,
    reducers: {
        toggleBoardView: (state) => {
            state.value = !state.value
        }
    }
})

export const {toggleBoardView} = boardViewSlice.actions
export default boardViewSlice.reducer