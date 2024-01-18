import React, { useState, useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";
import Selected from "./Selected";

function CanvasWorkspace({ elements, setElements }) {
  const svgWidth = 800;
  const svgHeight = 600;

  const [selectedElement, setSelectedElement] = useState(null);
  const [moving, setMoving] = useState(false);
  const [movingElement, setMovingElement] = useState(null);
  const [resizing, setResizing] = useState(false);
  const [resizingElement, setResizingElement] = useState(null);
  const [changeText, setChangeText] = useState(false);

  const getMousePos = (event) => {
    const svgRect = document.querySelector("svg").getBoundingClientRect();
    const x = event.clientX - svgRect.left;
    const y = event.clientY - svgRect.top;
    return { x: x, y: y };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (moving) move(e);
      if (resizing) resize(e);
    };

    const handleMouseUp = () => {
      if (moving) moveEnd();
      if (resizing) resizeEnd();
    };

    if (moving || resizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [moving, resizing]);

  const selectElements = (element) => {
    console.log(selectElements)
    setSelectedElement(element);
  };

  const moveStart = (e, element) => {
    e.preventDefault();
    setMoving(true);
    setMovingElement(element);
  };

  const move = (e) => {
    const pos = getMousePos(e);
    if (moving && movingElement) {
      setElements((elements) =>
        elements.map((element) =>
          element.id === movingElement.id
            ? {
                ...element,
                x: pos.x - element.width / 2,
                y: pos.y - element.height / 2,
              }
            : element
        )
      );
      setSelectedElement((element) =>
        {
          return element.id === movingElement.id
            ? {
                ...element,
                x: pos.x - element.width / 2,
                y: pos.y - element.height / 2,
              }
            : element
        }
      )
    }
  };

  const moveEnd = () => {
    setMoving(false);
    setMovingElement(null);
    setSelectedElement(null)
  };

  const resizeHandles = [
    { cursor: "nwse-resize", x: "left", y: "top" },
    { cursor: "nesw-resize", x: "right", y: "top" },
    { cursor: "nwse-resize", x: "left", y: "bottom" },
    { cursor: "nesw-resize", x: "right", y: "bottom" },
  ];

  const resizeStart = (e, element, handle) => {
    e.preventDefault();
    setResizing(true);
   
  }
  const resize = (e) => {
    const pos = getMousePos(e);
    if (resizing && resizingElement) {
      const { element, handle } = resizingElement;
      if (element) {
        const newWidth =
          handle.x === "left"
            ? element.width + (element.x - pos.x)
            : pos.x - element.x;
        const newHeight =
          handle.y === "top"
            ? element.height + (element.y - pos.y)
            : pos.y - element.y;
        setElements((elements) =>
          elements.map((el) =>
            el.id === element.id
              ? {
                  ...el,
                  x: handle.x === "left" ? pos.x : element.x,
                  y: handle.y === "top" ? pos.y : element.y,
                  width: Math.max(0, newWidth),
                  height: Math.max(0, newHeight),
                }
              : el
          )
        );
      }
    }
  };

  const resizeEnd = () => {
    setResizing(false);
    setResizingElement(null);
  };

  const setText = (e, textElement) => {
    setElements((elements) =>
      elements.map((element) =>
        element.id === textElement.id
          ? {
              ...element,
              text: e.target.value,
            }
          : element
      )
    );
  };

 console.log(selectedElement)

  return (
    <div className="relative top-[50px] left-[400px]">
      <svg
        className="border-2 bg-transparent w-[800px] h-[600px]"
        onMouseUp={moveEnd}
      >
        {elements &&
          elements.map((element, index) => {
            if (element.type === "svg") {
              return (
                <g key={index}>
                  <image
                    href={element.svg}
                    fill="black"
                    height={element.height}
                    width={element.width}
                    x={element.x}
                    y={element.y}
                    onClick={() => selectElements(element)}
                    onMouseDown={(e) => selectedElement && moveStart(e, element)}
                    onMouseOver={(e) =>
                      selectedElement && resizeStart(e, element)
                    }
                  />
                  <Selected selectedElement={selectedElement} setSelectedElement={setSelectedElement} />
                </g>
              );
            } else if (element.type === "text") {
              return (
                <g key={index}>
                  <foreignObject
                    x={element.x}
                    y={element.y}
                    width={element.width}
                    height={element.height}
                  >
                    <div
                      contentEditable={true}
                      style={{
                        fontFamily: "Arial",
                        fontSize: "20px",
                        color: "black",
                        width: "100%",
                        height: "100%",
                        boxSizing: "border-box",
                        overflow: "hidden",
                      }}
                      dangerouslySetInnerHTML={{ __html: element.text }}
                      ref={textRef}
                      onMouseDown={(e) => moveStart(e, element)}
                      onClick={() => selectElements(element)}
                    />
                  </foreignObject>
                  <Selected selectedElement={selectedElement} setSelectedElement={setSelectedElement} />
                </g>
              );
            }

            return null;
          })}
      </svg>
    </div>
  );
}

export default CanvasWorkspace;
