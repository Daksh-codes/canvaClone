import {configureStore } from  "@reduxjs/toolkit"
import elementsSlice from "./slices/elementsSlice"

export const elementsStore = configureStore({
    reducer : elementsSlice
}) 