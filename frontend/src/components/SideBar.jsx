import { useState } from "react";
import { Canvas } from "./Canvas";
import svg from "../assets/grass4.svg";
// import { drawSvg } from "./CanvasWorkspace";
import { svgElements } from "../svgAssets";
// import { draw } from "./Canvas";

const DraggableShape = ({ type, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      style={{
        width: "50px",
        height: "50px",
        backgroundColor: "#3498db",
        marginBottom: "10px",
        cursor: "grab",
      }}
    ></div>
  );
};

function Expand(value, sendSvg , sendText) {
  const [expand, setExpand] = useState(true);
  const [expandValue, setExpandValue] = useState(value);
  const [selectedShape, setSelectedShape] = useState("rectangle");

  // console.log(svgElements);

  return (
    <div className="absolute w-72 h-screen bg-neutral-800 top-0 left-[81px] ">
      {value}

      {value === "elements" && (
        <div className="flex">
          {svgElements.map((element) => {
            return (
              <div
                className="w-1/2 flex flex-col items-center"
                onClick={() => sendSvg(element)}
              >
                <img src={element.svg} alt={element.name} />
                <p>{element.name}</p>
              </div>
            );
          })}
        </div>
      )}
      {value === "text" && (
        <div className="flex items-center flex-col ">
          <button className="bg-sky-500 px-20 py-4 text-lg hover:bg-sky-700"
            onClick={(e)=> sendText()}
          
          >
            Add Text
          </button>
        </div>
      )}
    </div>
  );
}

function SideBar({ elements, setElements }) {
  const [expandValue, setExpandValue] = useState("elements");

  function sendSvg(element) {
    console.log(element);
    setElements((prev) => {
      return [
        ...prev,
        {
          id: prev.length + 1,
          type: "svg",
          name: element.name,
          svg: element.svg,
          width: 200,
          height: 200,
          x: 400,
          y: 300,
        },
      ];
    });
  }

  function sendText() {
    console.log("hahaha")
    setElements((prev) => {
      return [
        ...prev,
        {
          id: prev.length + 1,
          type: "text",
          fill: "black",
          font: "verdana",
          text: "Hahaha , this is a text ",
          x: 100,
          y: 100,
          width: 100 ,
          height : 100
        },
      ];
    });
  }

  return (
    <div className="flex bg-neutral-800 pt-4 h-screen text-gray-200 text-[12px] font-thin gap-4 flex-col items-center justify-start w-20 absolute left-0 top-10">
      <div
        className={`flex flex-col items-center justify-center rounded p-1  cursor-pointer  ${
          expandValue === "templates" ? `bg-stone-700` : ""
        } `}
        onClick={() => setExpandValue("templates")}
      >
        <span className="material-symbols-outlined text-2xl font-thin">
          space_dashboard
        </span>
        <p>Templates</p>
      </div>

      <div
        className={`flex flex-col items-center justify-center rounded p-1 w-16  cursor-pointer ${
          expandValue === "elements" ? `bg-stone-700` : ""
        } `}
        onClick={() => setExpandValue("elements")}
      >
        <span className="material-symbols-outlined text-2xl font-thin">
          interests
        </span>
        <p>Elements</p>
      </div>
      <div
        className={`flex flex-col items-center justify-center rounded p-1 w-16  cursor-pointer ${
          expandValue === "shape" ? `bg-stone-700` : ""
        } `}
        onClick={() => setExpandValue("shape")}
      >
        <span className="material-symbols-outlined text-2xl font-thin">
          shapes
        </span>
        <p>Shapes</p>
      </div>

      <div
        className={`flex flex-col items-center justify-center rounded p-1 w-16 cursor-pointer  ${
          expandValue === "text" ? `bg-stone-700` : ""
        } `}
        onClick={() => setExpandValue("text")}
      >
        <span className="material-symbols-outlined text-2xl font-thin">
          text_fields
        </span>
        <p>Text</p>
      </div>
      <div
        className={`flex flex-col items-center justify-center rounded p-1 w-16 cursor-pointer  ${
          expandValue === "images" ? `bg-stone-700` : ""
        } `}
        onClick={() => setExpandValue("images")}
      >
        <span className="material-symbols-outlined text-2xl font-thin">
          imagesmode
        </span>
        <p>Images</p>
      </div>
      <div
        className={`flex flex-col items-center justify-center rounded p-1 w-16 cursor-pointer ${
          expandValue === "uploads" ? `bg-stone-700` : ""
        } `}
        onClick={() => setExpandValue("uploads")}
      >
        <span className="material-symbols-outlined text-2xl font-thin">
          cloud_upload
        </span>
        <p>Uploads</p>
      </div>
      {Expand(expandValue, sendSvg , sendText)}
    </div>
  );
}

export default SideBar;
