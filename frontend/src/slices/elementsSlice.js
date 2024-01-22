import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  elements: [],
};

export const elementsSlice = createSlice({
  name: "elements",
  initialState,
  reducers: {
    addElement: (state, action) => {
      console.log(action.payload.type)
      let newElement = {};
      if (action.payload.type === "svg") {
        newElement = {
          id: nanoid(),
          type: "svg",
          name: action.payload.name,
          svg: action.payload.svg,
          width: 50,
          height: 50,
          x: 0,
          y: 0,
        };
      } else if (action.payload.type === "text") {
        newElement = {
          id: nanoid(),
          type: "text",
          fill: "black",
          font: "verdana",
          fontSize : 16 ,
          text: "Hahaha, this is a text",
          x: 100,
          y: 100,
          width: 100,
          height: 50,
        };
      } else if (action.payload.type === "img") {
        
        newElement = {
          id: nanoid(),
          type: "img",
          name: action.payload.name,
          img: action.payload.img,
          width: 200,
          height: 200,
          x: 0,
          y: 0,
        };
        console.log(newElement)
      } else if (action.payload.type === "rect") {
        newElement = {
          id: nanoid(),
          type: "rect",
          x: 10,
          y: 10,
          width: 50,
          height: 50,
          rx: 0,
          ry: 4,
          fill : "#000000"  ,
          stroke: "#000000"  ,
          strokeWidth: "1"
        };
        console.log(newElement)
      } else if (action.payload.type === "circle") {
        newElement = {
          id: nanoid(),
          type: "circle",
          x: 100,
          y: 100,
          r: 50,
          fill : "#000000" ,
          stroke: "#000000" ,
          strokeWidth: "1"
        };

      }else if (action.payload.type === "line"){
        newElement = {
          id: nanoid(),
          type: "line",
          x1: 0,
          y1: 0,
          x2: 100,
          y2: 100 ,
          stroke: "black" ,
          strokeWidth: "2"
        };
        console.log(newElement)
      }

      state.elements.push(newElement);
    },
    updateElement: (state, action) => {
      console.log(action.payload ? action.payload : [])
      state.elements = action.payload;
    },
    removeElement: (state, action) => {
      state.elements = state.elements.filter(
        (element) => element.id !== action.payload
      );
      console.log(state.elements)
    },
  },
});

export const { addElement, updateElement, removeElement } =
  elementsSlice.actions;
export default elementsSlice.reducer;
