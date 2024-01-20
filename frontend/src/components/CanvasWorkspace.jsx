import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateElement, removeElement } from "../slices/elementsSlice";
import Selected from "./Selected";

function CanvasWorkspace() {
  const svgWidth = 800;
  const svgHeight = 600;

  const [selectedElement, setSelectedElement] = useState(null);
  const [moving, setMoving] = useState(false);
  const [movingElement, setMovingElement] = useState(null);
  const [resizing, setResizing] = useState(false);
  const [resizingElement, setResizingElement] = useState(null);
  const [changeText, setChangeText] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.elements);
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
        // setElements((prevElements) =>
        //   prevElements.filter((element) => element.id !== selectedElement.id)
        // );
        dispatch(removeElement(selectedElement.id));
        setSelectedElement(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedElement]);

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
    // console.log(selectElements)
    setSelectedElement(element);
  };

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
    if (moving && movingElement) {
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

      setSelectedElement((element) => {
        return element.id === movingElement.id
          ? {
              ...element,
              x: pos.x - element.width / 2,
              y: pos.y - element.height / 2,
            }
          : element;
      });
    }
    // if (moving && movingElement) {
    //   setElements((elements) =>
    //     elements.map((element) =>
    //       element.id === movingElement.id
    //         ? {
    //             ...element,
    //             x: pos.x - element.width / 2,
    //             y: pos.y - element.height / 2,
    //           }
    //         : element
    //     )
    //   );
    //   setSelectedElement((element) => {
    //     return element.id === movingElement.id
    //       ? {
    //           ...element,
    //           x: pos.x - element.width / 2,
    //           y: pos.y - element.height / 2,
    //         }
    //       : element;
    //   });
    // }
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
      if (element) {
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
        // setElements((elements) =>
        //   elements.map((el) =>
        //     el.id === element.id
        //       ? {
        //           ...el,
        //           x: handle.x === "left" ? pos.x : element.x,
        //           y: handle.y === "top" ? pos.y : element.y,
        //           width: Math.max(0, newWidth),
        //           height: Math.max(0, newHeight),
        //         }
        //       : el
        //   )
        // );
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

    // setElements((elements) =>
    //   elements.map((element) =>
    //     element.id === textElement.id ? { ...element, text: newText } : element
    //   )
    // );
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
                    onMouseDown={(e) => moveStart(e, element)}
                    onMouseOver={(e) =>
                      selectedElement && resizeStart(e, element)
                    }
                  />
                  <Selected
                    resizeStart={resizeStart}
                    selectedElement={selectedElement}
                    setSelectedElement={setSelectedElement}
                  />
                </g>
              );
            } else if (element.type === "text") {
              console.log(element);
              return (
                <g key={index}>
                  <foreignObject
                    x={element.x}
                    y={element.y}
                    width={element.width}
                    height={element.height}
                    onClick={() => selectElements(element)}
                    onDoubleClick={() => setIsEditing(true)}
                    onBlur={() => setIsEditing(false)}
                  >
                    <div
                      className="h-full w-full"
                      onMouseDown={(e) => !isEditing && moveStart(e, element)}
                    >
                      {isEditing ? (
                        <textarea
                          // type="text"
                          value={element.text}
                          onChange={(e) => handleContentChange(e, element)}
                          // style={{
                          //   width: "100%",
                          //   height: "100%",
                          //   fontSize: "20px",
                          //   fontFamily: "Arial",
                          //   color: "black",
                          //   boxSizing: "border-box",
                          // }}
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
                  {/* <foreignObject
                    x={element.x}
                    y={element.y}
                    width={element.width}
                    height={element.height}
                    onClick={() => selectElements(element)}
                    onDoubleClick={() => setChangeText(!changeText)}
                  >
                    <div
                      contentEditable={changeText}
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
                      onMouseDown={(e) => moveStart(e, element)}
                      onInput={(e) => handleContentChange(e, element)}
                    />
                  </foreignObject> */}
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
