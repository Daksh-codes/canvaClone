import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Workspace";
import Temp from "./pages/temp";

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          {/* <Route path="/" element={<div>hhahahaha</div>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
