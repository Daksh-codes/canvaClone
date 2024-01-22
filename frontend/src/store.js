import { configureStore } from "@reduxjs/toolkit";
import elementsSlice from "./slices/elementsSlice";
import userSlice from "./slices/userSlice";

export const elementsStore = configureStore({
  reducer: {
    elements: elementsSlice,
    user: userSlice,
  },
});

export const userStore = configureStore({
  reducer: {
    user: userSlice,
  },
});
