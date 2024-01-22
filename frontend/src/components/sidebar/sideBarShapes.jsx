import React from "react";

import circle from "../../assets/greyCircle.png";

import { useDispatch } from "react-redux";
import { addElement } from "../../slices/elementsSlice";

function SideBarShapes() {
  const dispatch = useDispatch();
  return (
    <div className="flex  items-center  ">
      <div
        className="w-1/2 flex-col flex items-center  "
        onClick={() => dispatch(addElement({ type: "rect" }))}
      >
        <svg
          viewBox="0 0 220 100"
          xmlns="http://www.w3.org/2000/svg"
          className="flex items-center"
        >
          <rect width="150" height="150" x="39" fill="grey" />
        </svg>
        <h3>Rectangle</h3>
      </div>
      <div
        className="w-1/2  flex  flex-col items-center "
        onClick={() => dispatch(addElement({ type: "circle" }))}
      >
        <img src={circle} alt="rectangle" className="w-full" />
        <h3>Circle</h3>
      </div>
      {/* <div className="w-1/2 flex  flex-col items-center ">
        <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="40,10 150,10 40,100 150,150  200 , 100"
            fill="grey"
            stroke="black"
          />
        </svg>
        <h3>polygon</h3>
      </div> */}
      <div className="w-1/2 flex  flex-col items-center "
       onClick={() => dispatch(addElement({ type: "line" }))}>
        <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="40"
            y1="10"
            x2="120"
            y2="100"
            stroke="grey"
            strokeWidth={5}
          />
        </svg>
        <h3>Line</h3>
      </div>
    </div>
  );
}

export default SideBarShapes;
