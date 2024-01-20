import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addElement, updateElement } from "../../slices/elementsSlice";
import SidebarExpand from "./SideBarExpand.jsx";

function SideBar() {
  const [expandValue, setExpandValue] = useState("elements");
  const dispatch = useDispatch();

  function sendSvg(element) {
    dispatch(addElement({ type: "svg", ...element }));
  }

  function sendText() {
    dispatch(addElement({ type: "text" }));
  }

  return (
    <div className="flex bg-neutral-800 pt-4 h-[93.8vh] text-gray-200 text-[12px] font-thin gap-4 flex-col items-center justify-start w-20 absolute left-0 top-10">
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
      {SidebarExpand(expandValue, sendSvg, sendText)}
    </div>
  );
}

export default SideBar;
