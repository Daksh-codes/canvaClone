import React, { useState } from "react";
import SideBar from "../components/sidebar/SideBar";
import CanvasWorkspace from "../components/CanvasWorkspace";
import Navbar from "../components/navbar";
import { Provider } from "react-redux";
import { elementsStore } from "../store";

function Home() {
  const [elements, setElements] = useState([]);

  return (
    <Provider store={elementsStore}>
      <div className="overflow-hidden h-[100vh]">
        <Navbar />
        <SideBar elements={elements} setElements={setElements} />
        <CanvasWorkspace elements={elements} setElements={setElements} />
      </div>
    </Provider>
  );
}

export default Home;
