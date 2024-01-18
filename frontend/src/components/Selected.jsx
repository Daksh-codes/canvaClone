import React from "react";

function Selected(props) {
const selectedElement = props.selectedElement
  const resizeHandles = [
    { cursor: "nwse-resize", x: "left", y: "top" },
    { cursor: "nesw-resize", x: "right", y: "top" },
    { cursor: "nwse-resize", x: "left", y: "bottom" },
    { cursor: "nesw-resize", x: "right", y: "bottom" },
  ];
  // console.log(selectedElement)
  if (selectedElement) {

    return (
      <g>
        <rect
          key={selectedElement.id}
          width={selectedElement.width}
          height={selectedElement.height}
          x={selectedElement.x}
          y={selectedElement.y}
          stroke="blue"
          fill="none"
        />
        {resizeHandles.map((handle, handleIndex) => {
          return (
            <rect
              key={handleIndex}
              x={
                handle.x === "left"
                  ? selectedElement.x - 5
                  : selectedElement.x + selectedElement.width - 5
              }
              y={
                handle.y === "top"
                  ? selectedElement.y - 5
                  : selectedElement.y + selectedElement.height - 5
              }
              width={10}
              height={10}
              fill="#3498db"
              style={{ cursor: handle.cursor }}
              //   onMouseDown={(e) => resizeStart(e, selectedElement, handle)}
            />
          );
        })}
      </g>
    );

  }
  else{
    // return <text x={100}  w={100}  />
  }
}

export default Selected;
