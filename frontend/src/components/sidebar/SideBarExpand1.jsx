import { useState, useEffect } from "react";
import axios from "axios";
import SideBarShapes from "./sideBarShapes";
import { useDispatch, useSelector } from "react-redux";
import { addElement, updateElement } from "../../slices/elementsSlice";

function SidebarExpand(value) {
  const [svgData, setSvgData] = useState([]);
  const [expandValue, setExpandValue] = useState(value);
  const dispatch = useDispatch();

  function sendSvg(element) {
    dispatch(addElement({ type: "svg", ...element }));
  }

  function sendText() {
    dispatch(addElement({ type: "text" }));
  }

  useEffect(() => {
    const getSvgElements = async () => {
      const res = await axios.get("http://localhost:5000/api/assets/");
      setSvgData(res.data);
    };
    getSvgElements();
  }, []);

  return (
    <div className="absolute w-72 h-[93.8vh] bg-neutral-800 top-0 left-[80px] border-stone-500 border-l-2 ">
      {expandValue}

      {expandValue === "elements" && (
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
      {expandValue === "text" && (
        <div className="flex items-center flex-col ">
          <button
            className="bg-sky-500 px-20 py-4 text-lg hover:bg-sky-700"
            onClick={(e) => sendText()}
          >
            Add Text
          </button>
        </div>
      )}
      {expandValue === "shape" && <SideBarShapes />}
      {expandValue === "editText" && <SideBarShapes />}
    </div>
  );
}

export default SidebarExpand;
