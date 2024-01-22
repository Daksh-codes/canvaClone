import { useState } from "react";

function Selected(props) {
  const [resizing, setResizing] = useState(false);
  const [resizingElement, setResizingElement] = useState(null);

  const selectedElement = props.selectedElement;

  const resizeHandles = [
    { cursor: "nwse-resize", x: "left", y: "top" },
    { cursor: "nesw-resize", x: "right", y: "top" },
    { cursor: "nwse-resize", x: "left", y: "bottom" },
    { cursor: "nesw-resize", x: "right", y: "bottom" },
  ];

  // console.log(selectedElement)
  if (selectedElement && selectedElement.type === "line") {
    console.log(selectedElement);
    return (
      <g>
        <line
          key={selectedElement.id}
          x1={selectedElement.x1}
          y1={selectedElement.y1}
          x2={selectedElement.x2}
          y2={selectedElement.y2}
          stroke="blue"
          strokeWidth={4}
        />
        {resizeHandles.map((handle, handleIndex) => {
          return (
            <rect
              key={handleIndex}
              x={
                handle.x === "left"
                  ? selectedElement.x - selectedElement.r - 5
                  : selectedElement.x -
                    selectedElement.r +
                    selectedElement.r +
                    selectedElement.r -
                    5
              }
              y={
                handle.y === "top"
                  ? selectedElement.y - selectedElement.r - 5
                  : selectedElement.y -
                    selectedElement.r +
                    selectedElement.r +
                    selectedElement.r -
                    5
              }
              width={10}
              height={10}
              fill="#3498db"
              style={{ cursor: handle.cursor }}
              onMouseDown={(e) => props.resizeStart(e, selectedElement, handle)}
            />
          );
        })}
      </g>
    );
  }
  if (selectedElement && selectedElement.type === "circle") {
    return (
      <g>
        <rect
          key={selectedElement.id}
          width={selectedElement.r + selectedElement.r}
          height={selectedElement.r + selectedElement.r}
          x={selectedElement.x - selectedElement.r}
          y={selectedElement.y - selectedElement.r}
          stroke="blue"
          fill="none"
        />
        {resizeHandles.map((handle, handleIndex) => {
          return (
            <rect
              key={handleIndex}
              x={
                handle.x === "left"
                  ? selectedElement.x - selectedElement.r - 5
                  : selectedElement.x -
                    selectedElement.r +
                    selectedElement.r +
                    selectedElement.r -
                    5
              }
              y={
                handle.y === "top"
                  ? selectedElement.y - selectedElement.r - 5
                  : selectedElement.y -
                    selectedElement.r +
                    selectedElement.r +
                    selectedElement.r -
                    5
              }
              width={10}
              height={10}
              fill="#3498db"
              style={{ cursor: handle.cursor }}
              onMouseDown={(e) => props.resizeStart(e, selectedElement, handle)}
            />
          );
        })}
      </g>
    );
  }
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
              onMouseDown={(e) => props.resizeStart(e, selectedElement, handle)}
            />
          );
        })}
      </g>
    );
  } else {
    // return <text x={100}  w={100}  />
  }
}

export default Selected;
