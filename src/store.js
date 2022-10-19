import { configureStore } from "@reduxjs/toolkit";
import sidebarDrawerReducer from "../src/components/sidebarSlice"
import boardViewReducer from "../src/components/boardViewSlice"
import searchQueryReducer from "../src/components/searchSlice"

export const store = configureStore({
    reducer: {
        sidebarDrawer: sidebarDrawerReducer,
        boardView: boardViewReducer,
        searchQuery: searchQueryReducer
    },
})