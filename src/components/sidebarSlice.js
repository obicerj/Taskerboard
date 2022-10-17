import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: false,
}

export const sidebarSlice = createSlice({
    name: 'sidebarDrawer',
    initialState,
    reducers: {
        toggleSidebarDrawer: (state) => {
            state.value = !state.value
        }
    }
})

export const {toggleSidebarDrawer} = sidebarSlice.actions
export default sidebarSlice.reducer