import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");
let initialState = null;

if (storedUser) {
  initialState = JSON.parse(storedUser);
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      console.log(state)
    },
    removeUser: (state, action) => {
      state = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
