import { useState, useEffect } from "react";
import axios from "axios";
import SideBarShapes from "./sideBarShapes";
import { useDispatch, useSelector } from "react-redux";
import { addElement, updateElement } from "../../slices/elementsSlice";
import SidebarImages from "./sidebarImages";

function Expand({ value, setValue, selectedElement }) {
  const [svgData, setSvgData] = useState([]);
  const dispatch = useDispatch();
    console.log(value   )
  function sendSvg(element) {
    dispatch(addElement({ type: "svg", ...element }));
  }

  function sendText() {
    dispatch(addElement({ type: "text" }));
  }

  if(selectedElement && selectedElement.type==="text") {
    setValue("text")
  }

  useEffect(() => {
    const getSvgElements = async () => {
      const res = await axios.get("http://localhost:5000/api/assets/");
      setSvgData(res.data);
    };
    getSvgElements();
  }, []);

  return (
    <div className="absolute top-0 left-[78px] w-[20vw] h-[93.2vh] bg-neutral-800 text-sky-50  border-stone-500 border-l-2 ">
      {value === "elements" && (
        <div className="flex flex-wrap overflow-auto h-[90vh] bg-neutral-800  ">
          {svgData &&
            svgData.map((element) => {
              // console.log(element)
              return (
                <div
                  key={element._id}
                  className="w-1/3 flex flex-col items-center  "
                  onClick={() => sendSvg(element)}
                >
                  <img src={element.svg} alt={element.name} />
                  <p className="font-extralight text-xs">{element.name}</p>
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
          {selectedElement && selectedElement.type === "text" && (
            <div>
              {setValue("text")}
              {selectedElement.text}
            </div>
          )}
        </div>
      )}
      {value === "shape" && <SideBarShapes />}
      {value === "images" && <SidebarImages />}
    </div>
  );
}

export default Expand;
