import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateElement } from "../slices/elementsSlice";

function EditsSection({ selectedElement }) {
  const dispatch = useDispatch();

  if (
    selectedElement &&
    (selectedElement.type === "rect" || selectedElement.type === "circle")
  ) {
    const [color, setColor] = useState(selectedElement.fill);
    const [stroke, setStroke] = useState(selectedElement.stroke);
    const [strokeWidth, setStrokeWidth] = useState(selectedElement.strokeWidth);
    const elements = useSelector((state) => state.elements.elements);
    const applyFilters = (e) => {
      e.preventDefault();
      console.log(parseInt(strokeWidth));
      dispatch(
        updateElement(
          elements &&
            elements.map((element) => {
              if (element.id === selectedElement.id) {
                return {
                  ...element,
                  fill: color,
                  stroke,
                  strokeWidth: parseInt(strokeWidth),
                };
              }
              return element;
            })
        )
      );
      console.log(color, stroke);
    };
    return (
      <div className="absolute left-[26vw] flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label>color: </label>

          <input
            type="color"
            name=""
            id=""
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label>Stroke color: </label>

          <input
            type="color"
            name=""
            id=""
            value={stroke}
            onChange={(e) => setStroke(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label>Stroke width: </label>
          <input
            type="number"
            name=""
            id=""
            className="w-16"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(e.target.value)}
          />
        </div>

        <button
          onClick={(e) => applyFilters(e)}
          className="border-[1px] border-black bg-gray-400 px-2 hover:bg-gray-200"
        >
          Apply changes
        </button>
      </div>
    );
  }
  if (selectedElement && selectedElement.type === "text") {
    const [color, setColor] = useState("#000000");
    const [fontsize, setFontsize] = useState(selectedElement.fontSize);
    const elements = useSelector((state) => state.elements.elements);
    const applyFilters = (e) => {
      e.preventDefault();
      console.log(elements);
      dispatch(
        updateElement(
          elements &&
            elements.map((element) => {
              if (element.id === selectedElement.id) {
                return {
                  ...element,
                  fill: color,
                  fontsize,
                };
              }
              return element;
            })
        )
      );
      console.log(color, fontsize);
    };
    return (
      <div className="absolute left-[26vw] flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label>color: </label>

          <input
            type="color"
            name=""
            id=""
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label>font size: </label>
          <input
            type="number"
            name=""
            id=""
            className="w-16"
            value={fontsize}
            onChange={(e) => setFontsize(e.target.value)}
          />
        </div>
        <button
          onClick={(e) => applyFilters(e)}
          className="border-[1px] border-black bg-gray-400 px-2 hover:bg-gray-200"
        >
          Apply changes
        </button>
      </div>
    );
  }
}

export default EditsSection;
