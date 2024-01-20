import { useState , useEffect } from "react";
import axios from "axios";
import SideBarShapes from "./sideBarShapes";

function SidebarExpand(value, sendSvg, sendText) {
    // const [expand, setExpand] = useState(true);
    // const [expandValue, setExpandValue] = useState(value);
    // const [selectedShape, setSelectedShape] = useState("rectangle");
    const [svgData, setSvgData] = useState([]);
  
    // console.log(svgElements);
    // const getMousePos = (event) => {
    //   const svgRect = document.querySelector("svg").getBoundingClientRect();
    //   const x = event.clientX - svgRect.left;
    //   const y = event.clientY - svgRect.top;
    //   return { x: x, y: y };
    // };
  
    useEffect(() => {
      const getSvgElements = async () => {
        const res = await axios.get("http://localhost:5000/api/assets/");
        console.log(res.data);
        setSvgData(res.data);
      };
      getSvgElements();
    }, []);
  
    return (
      <div className="absolute w-72 h-[93.8vh] bg-neutral-800 top-0 left-[80px] border-stone-500 border-l-2 ">
        {value}
  
        {value === "elements" && (
          <div className="flex flex-wrap overflow-auto h-[90vh] bg-neutral-800">
            {svgData &&
              svgData.map((element) => {
                return (
                  <div
                    className="w-1/3 flex flex-col items-center"
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
            <button
              className="bg-sky-500 px-20 py-4 text-lg hover:bg-sky-700"
              onClick={(e) => sendText()}
            >
              Add Text
            </button>
          </div>
        )}
        {value === "shape" && <SideBarShapes />}
      </div>
    );
  }

export default SidebarExpand