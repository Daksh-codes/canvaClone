import React from 'react'

function SidebarColumn({value , setValue}) {

    return (
        <div className="flex bg-neutral-800 pt-4 h-[93.2vh] text-gray-200 text-[12px] font-thin gap-4 flex-col items-center justify-start w-20 ">
          <div
            className={`flex flex-col items-center justify-center rounded p-1  cursor-pointer  ${
              value === "templates" ? `bg-stone-700` : ""
            } `}
            onClick={() => setValue("templates")}
          >
            <span className="material-symbols-outlined text-2xl font-thin">
              space_dashboard
            </span>
            <p>Templates</p>
          </div>
    
          <div
            className={`flex flex-col items-center justify-center rounded p-1 w-16  cursor-pointer ${
              value === "elements" ? `bg-stone-700` : ""
            } `}
            onClick={() => setValue("elements")}
          >
            <span className="material-symbols-outlined text-2xl font-thin">
              interests
            </span>
            <p>Elements</p>
          </div>
          <div
            className={`flex flex-col items-center justify-center rounded p-1 w-16  cursor-pointer ${
              value === "shape" ? `bg-stone-700` : ""
            } `}
            onClick={() => setValue("shape")}
          >
            <span className="material-symbols-outlined text-2xl font-thin">
              shapes
            </span>
            <p>Shapes</p>
          </div>
    
          <div
            className={`flex flex-col items-center justify-center rounded p-1 w-16 cursor-pointer  ${
              value === "text" ? `bg-stone-700` : ""
            } `}
            onClick={() => setValue("text")}
          >
            <span className="material-symbols-outlined text-2xl font-thin">
              text_fields
            </span>
            <p>Text</p>
          </div>
          <div
            className={`flex flex-col items-center justify-center rounded p-1 w-16 cursor-pointer  ${
              value === "images" ? `bg-stone-700` : ""
            } `}
            onClick={() => setValue("images")}
          >
            <span className="material-symbols-outlined text-2xl font-thin">
              imagesmode
            </span>
            <p>Images</p>
          </div>
          <div
            className={`flex flex-col items-center justify-center rounded p-1 w-16 cursor-pointer ${
              value === "uploads" ? `bg-stone-700` : ""
            } `}
            onClick={() => setValue("uploads")}
          >
            <span className="material-symbols-outlined text-2xl font-thin">
              cloud_upload
            </span>
            <p>Uploads</p>
          </div>

        </div>
      );
}

export default SidebarColumn