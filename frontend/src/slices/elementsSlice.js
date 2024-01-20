import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  elements: [],
};

export const elementsSlice = createSlice({
  name: "elements",
  initialState,
  reducers: {
    addElement: (state, action) => {
      const newElement =
        action.payload.type === "svg"
          ? {
              id: nanoid(),
              type: "svg",
              name: action.payload.name,
              svg: action.payload.svg,
              width: 200,
              height: 200,
              x: 400,
              y: 300,
            }
          : {
              id: nanoid(),
              type: "text",
              fill: "black",
              font: "verdana",
              text: "Hahaha, this is a text",
              x: 100,
              y: 100,
              width: 100,
              height: 100,
            };

      state.elements.push(newElement);
    },
    updateElement: (state, action) => {
      state.elements = action.payload;
    },
    removeElement: (state, action) => {
      state.elements = state.elements.filter(
        (element) => element.id !== action.payload
      );
    },
  },
});

export const { addElement, updateElement, removeElement } = elementsSlice.actions;
export default elementsSlice.reducer;
