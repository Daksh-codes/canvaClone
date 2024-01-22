import React, { useState } from "react";
import SidebarColumn from "./SidebarColumn";
import Expand from "./expand";

function SideBar1({ selectedElement, setSelectedElement }) {
  const [value, setValue] = useState('elements');



  return (
    <div className="absolute left-0 h-[50vh]  ">
      <SidebarColumn value={value} setValue={setValue} />
      <Expand  value={value} setValue={setValue}  selectedElement={selectedElement} />
    </div>
  );
}

export default SideBar1;
