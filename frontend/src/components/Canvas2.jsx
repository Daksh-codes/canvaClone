import React, { useState } from "react";
import useImage from 'use-image';

function Canvas2() {
  const [elements, setElements] = useState([]);
  const [selectedElements, setSelectedElements] = useState([]);
  const [moveElement, setMoveElement] = useState(null);

  const svgWidth = 800;
  const svgHeight = 600;

  // Calculate center coordinates for the rectangle
  const rectWidth = 150;
  const rectHeight = 100;
  const rectX = (svgWidth - rectWidth) / 2;
  const rectY = (svgHeight - rectHeight) / 2;

  function createRect(w, h, x, y, color, stroke, strokeColor) {
    setElements((prev) => [
      ...prev,
      {
        type: "rect",
        index: prev.length + 1,
        width: w,
        height: h,
        x: x,
        y: y,
        stroke: strokeColor ? strokeColor : "black",
        strokeWidth: stroke ? stroke : 1,
        fill: color ? color : "grey",
      },
    ]);
  }

  function showSeletectedElement(index) {
    console.log(index);
    setElements(() => {
      return elements.map((element) => {
        if (element.index === index) {
          return {
            ...element,
            stroke: "blue",
            strokeWidth: 5,
          };
        }
        return element;
      });
    });
  }

  function selectElement(index) {
    console.log(index);
    setSelectedElements([]);
    elements.map((element) => {
      if (element.index === index && element.type === "rect") {
        setSelectedElements((prev) => [
          ...prev,
          {
            type: "rect",
            index: selectedElements.length + 1,
            width: element.width,
            height: element.height,
            x: element.x,
            y: element.y,
            stroke: "blue",
            strokeWidth: 3,
            fill: "#00000000",
          },
        ]);
      } else if (element.index === index && element.type === "circle") {
        console.log(element);
        setSelectedElements((prev) => [
          ...prev,
          {
            type: "rect",
            index: selectedElements.length + 1,
            width: element.r + element.r,
            height: element.r + element.r,
            x: element.cx - element.r,
            y: element.cy - element.r,
            stroke: "blue",
            strokeWidth: 3,
            fill: "#00000000",
          },
        ]);
      }
    });

    // showSeletectedElement(index);
  }

  function createCircle(r, x, y, color, stroke, strokeColor) {
    setElements((prev) => [
      ...prev,
      {
        type: "circle",
        index: prev.length + 1,
        r: r,
        cx: x,
        cy: y,
        stroke: strokeColor ? strokeColor : "black",
        strokeWidth: stroke ? stroke : 1,
        fill: color ? color : "grey",
      },
    ]);
  }

  function getMousePos(e) {
    const x = e.clientX - e.target.getBoundingClientRect().left;
    const y = e.clientY - e.target.getBoundingClientRect().top;
    return { x, y };
  }

  // Handle adding a rectangle to the state on button click
  const handleAddRectangle = () => {
    createRect(100, 100, 200, 200);
  };

  // Handle adding a circle to the state on button click
  const handleAddCircle = () => {
    createCircle(100, 300, 300);
  };

  function move(e, index) {}

  const moveStart = (e, index) => {
    setMoveElement(index);
    let pos = getMousePos(e);
    console.log("move", pos);

    setElements((elements) => {
      return elements.map((element) => {
        if (element.index === index) {
          return {
            ...element,
            x: e.clientX,
            y: e.clientY,
          };
        }
      });
    });
  };

  const addSVG = (url) => {
    const [image] = useImage(url);
    setElements((elements) => {
      return [...elements, {
        svg : image
      }];
    });
  };


  return (
    <div className="relative top-12 left-[30vw]">
      <button onClick={handleAddRectangle}>Add Rectangle</button>
      <button onClick={handleAddCircle}>Add Circle</button>

      <svg
        className="border-2 bg-transparent w-[800px] h-[600px]"
        onMouseMove={(e) => getMousePos(e)}
        // onClick={() => setSelectedElements([])}
        onMouseUp={(e) =>
          console.log(
            "mouseUp",
            e.clientX - e.target.getBoundingClientRect().left
          )
        }
      >
        <image href="https://www.svgrepo.com/show/530155/difficulty.svg" fill="black" height="200" width="200" />
        
      </svg>
      {console.log(selectedElements)}
    </div>
  );
}

export default Canvas2;




{/* {elements &&
          elements.map((element) => {
            if (element.type === "rect") {
              return (
                <rect
                  key={element.index}
                  width={element.width}
                  height={element.height}
                  x={element.x}
                  y={element.y}
                  stroke={element.stroke}
                  strokeWidth={element.strokeWidth}
                  fill={element.fill}
                  onClick={() => selectElement(element.index)}
                />
              );
            } else if (element.type === "circle") {
              return (
                <circle
                  key={element.index}
                  r={element.r}
                  cx={element.cx}
                  cy={element.cy}
                  stroke={element.stroke}
                  strokeWidth={element.strokeWidth}
                  fill={element.fill}
                  onClick={() => selectElement(element.index)}
                />
              );
            }
            return null;
          })}
        {selectedElements &&
          selectedElements.map((element) => {
            return (
              <rect
                key={element.index}
                width={element.width}
                height={element.height}
                x={element.x}
                y={element.y}
                stroke={element.stroke}
                strokeWidth={element.strokeWidth}
                fill={element.fill}
                onClick={() => selectElement(element.index)}
                onMouseDown={(e) => moveStart(e, element.index)}
              />
            );

            return null;
          })} */}
