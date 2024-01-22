import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateElement, removeElement } from "../slices/elementsSlice";
import Selected from "./Selected";

function CanvasWorkspace({
  selectedElement,
  setSelectedElement,
  setDownloadUrl,
  height,
  width,
}) {
  const svgWidth = width || 600;
  const svgHeight = height || 400;
  console.log({ svgWidth, svgHeight });

  const [moving, setMoving] = useState(false);
  const [movingElement, setMovingElement] = useState(null);
  const [resizing, setResizing] = useState(false);
  const [resizingElement, setResizingElement] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const [zoomLevel, setZoomLevel] = useState(1);
  const svgRef = useRef(null);

  const elements = useSelector((state) => state.elements.elements || []);
  console.log(elements.elements);

  // console.log(elements);

  const getMousePos = (event) => {
    const svgRect = document.querySelector("svg").getBoundingClientRect();
    const x = event.clientX - svgRect.left;
    const y = event.clientY - svgRect.top;
    return { x: x, y: y };
  };

  // ------------------------ //
  // Handling keyboard button //
  // ------------------------ //
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete" && selectedElement) {
        dispatch(removeElement(selectedElement.id));
        setSelectedElement(null);
      } else if (event.ctrlKey && (event.key === "+" || event.key === "-")) {
        // Ctrl + "+" for zoom in, Ctrl + "-" for zoom out
        event.preventDefault(); // Prevent default browser zoom behavior
        if (event.key === "+") {
          setZoomLevel((prevZoom) => prevZoom + 0.1);
        } else if (event.key === "-") {
          setZoomLevel((prevZoom) => Math.max(0.1, prevZoom - 0.1));
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedElement, zoomLevel]);

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
    console.log(selectElements);
    setSelectedElement(element);
  };
  useEffect(() => {
    async function handleDownload() {
      const svg = svgRef.current;
      const w = svgWidth * zoomLevel;
      const h = svgHeight * zoomLevel;

      // Create a new canvas
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const context = canvas.getContext("2d");
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Serialize the main SVG
      const svgData = new XMLSerializer().serializeToString(svg);

      // Create an image element for the main SVG
      const imgMain = new Image();
      imgMain.src = "data:image/svg+xml;base64," + btoa(svgData);

      // Wait for the main SVG to load
      await new Promise((resolve) => {
        imgMain.onload = resolve;
      });

      // Draw the main SVG onto the canvas
      context.drawImage(imgMain, 0, 0, w, h);

      // Convert the canvas to a data URL
      const dataURL = canvas.toDataURL("image/png");

      // Set the data URL to your state or use it as needed
      setDownloadUrl(dataURL);
    }

    handleDownload();
  }, [elements, zoomLevel]);

  // ------------------------ //
  // Handling movement of element //
  // ------------------------ //
  const moveStart = (e, element) => {
    e.preventDefault();
    setMoving(true);
    setMovingElement(element);
    setSelectedElement(element);
  };

  const move = (e) => {
    const pos = getMousePos(e);

    // if (moving && movingElement.type === "circle") {
    //   console.log(pos.x, movingElement.x);
    //   console.log(
    //     elements.map((element) =>
    //       element.id === movingElement.id
    //         ? {
    //             ...element,
    //             x: pos.x,
    //             y: pos.y,
    //           }
    //         : element
    //     )
    //   );
    //   dispatch(
    //     updateElement(
    //       elements.map((element) =>
    //         element.id === movingElement.id
    //           ? {
    //               ...element,
    //               x: pos.x,
    //               y: pos.y,
    //             }
    //           : element
    //       )
    //     )
    //   );
    // }

    if (moving && movingElement) {
      console.log(pos);
      dispatch(
        updateElement(
          elements.map((element) =>
            element.id === movingElement.id
              ? {
                  ...element,
                  x: pos.x - element.width / 2,
                  y: pos.y - element.height / 2,
                }
              : element
          )
        )
      );

      // setSelectedElement((element) => {
      //   return element.id === movingElement.id
      //     ? {
      //         ...element,
      //         x: pos.x - element.width / 2,
      //         y: pos.y - element.height / 2,
      //       }
      //     : element;
      // });
    }
  };

  const moveEnd = () => {
    setMoving(false);
    setMovingElement(null);
    setSelectedElement(null);
    // setIsEditing(false)
  };

  // ------------------------ //
  // Handling resizing of element element //
  // ------------------------ //
  const resizeStart = (e, element, handle) => {
    e.preventDefault();
    // console.log("resizeStart", element, handle);
    setResizingElement({ element, handle });
    setResizing(true);
  };
  const resize = (e) => {
    // console.log("resize", resizingElement);
    const pos = getMousePos(e);
    if (resizing && resizingElement) {
      const { element, handle } = resizingElement;
      if (element && handle) {
        const newWidth =
          handle.x === "left"
            ? element.width + (element.x - pos.x)
            : pos.x - element.x;
        const newHeight =
          handle.y === "top"
            ? element.height + (element.y - pos.y)
            : pos.y - element.y;
        dispatch(
          updateElement(
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
          )
        );

        setSelectedElement((element) => {
          return {
            ...element,
            x: handle.x === "left" ? pos.x : element.x,
            y: handle.y === "top" ? pos.y : element.y,
            width: Math.max(0, newWidth),
            height: Math.max(0, newHeight),
          };
        });
      }
    }
  };

  const resizeEnd = () => {
    setResizing(false);
    setResizingElement(null);
  };

  const handleContentChange = (e, textElement) => {
    const newText = e.target.value;
    dispatch(
      updateElement(
        elements.map((element) =>
          element.id === textElement.id
            ? { ...element, text: newText }
            : element
        )
      )
    );
  };

  return (
    <div className="relative top-[35px] left-[400px] overflow-auto">
      <svg
        className="border-2 bg-white border-stone-800 "
        onMouseUp={moveEnd}
        ref={svgRef}
        width={svgWidth}
        height={svgHeight}
        style={{ transform: `scale(${zoomLevel})` }}
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
                    onMouseDown={(e) => moveStart(e, element)}
                  />
                  <Selected
                    resizeStart={resizeStart}
                    selectedElement={selectedElement}
                    setSelectedElement={setSelectedElement}
                  />
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
                    onClick={() => selectElements(element)}
                    fontSize={parseInt(element.fontSize)}
                    color={element.fill}
                    onDoubleClick={() => setIsEditing(true)}
                    onBlur={() => setIsEditing(false)}
                  >
                    <div
                      className="h-full w-full"
                      onMouseDown={(e) => !isEditing && moveStart(e, element)}
                    >
                      {isEditing ? (
                        <textarea
                          value={element.text}
                          onChange={(e) => handleContentChange(e, element)}
                          style={{ overflowWrap: "break-word" }}
                          className="h-full w-full "
                        />
                      ) : (
                        <span>{element.text}</span>
                      )}
                    </div>
                  </foreignObject>
                  <Selected
                    selectedElement={selectedElement}
                    setSelectedElement={setSelectedElement}
                    resizeStart={resizeStart}
                  />
                </g>
              );
            } else if (element.type === "img") {
              console.log(element);
              return (
                <image
                  href={element.img}
                  height={element.height}
                  width={element.width}
                  x={element.x}
                  y={element.y}
                  onClick={() => selectElements(element)}
                  onMouseDown={(e) => moveStart(e, element)}
                />
              );
            } else if (element.type === "rect") {
              console.log(element);
              return (
                <g>
                  <rect
                    x={element.x}
                    width={element.width}
                    y={element.y}
                    height={element.height}
                    rx={element.rx}
                    ry={element.ry}
                    fill={element.fill}
                    stroke={element.stroke}
                    strokeWidth={element.strokeWidth}
                    onClick={() => selectElements(element)}
                    onMouseDown={(e) => moveStart(e, element)}
                  />
                  <Selected
                    resizeStart={resizeStart}
                    selectedElement={selectedElement}
                    setSelectedElement={setSelectedElement}
                  />
                </g>
              );
            } else if (element.type === "circle") {
              console.log(element);
              return (
                <g>
                  <circle
                    cx={element.x}
                    cy={element.y}
                    r={element.r}
                    fill={element.fill}
                    stroke={element.stroke}
                    strokeWidth={element.strokeWidth}
                    onClick={() => selectElements(element)}
                    onMouseDown={(e) => moveStart(e, element)}
                  />
                  <Selected
                    resizeStart={resizeStart}
                    selectedElement={selectedElement}
                    setSelectedElement={setSelectedElement}
                  />
                </g>
              );
            } else if (element.type === "line") {
              console.log(element);
              return (
                <g>
                  <line
                    x1={element.x1}
                    y1={element.y1}
                    x2={element.x2}
                    y2={element.y2}
                    stroke={element.stroke}
                    strokeWidth={element.strokeWidth}
                    onClick={() => selectElements(element)}
                    onMouseDown={(e) => moveStart(e, element)}
                  />
                  <Selected
                    resizeStart={resizeStart}
                    selectedElement={selectedElement}
                    setSelectedElement={setSelectedElement}
                  />
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
