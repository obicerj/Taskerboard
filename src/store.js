import { configureStore } from "@reduxjs/toolkit";
import sidebarDrawerReducer from "../src/components/sidebarSlice"

export const store = configureStore({
    reducer: {
        sidebarDrawer: sidebarDrawerReducer
    },
})