import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: "",
}

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setQuery: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {setQuery} = searchSlice.actions
export default searchSlice.reducer
