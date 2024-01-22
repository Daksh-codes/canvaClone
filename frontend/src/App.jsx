import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Workspace";
import Temp from "./pages/temp";
import HomePage from "./pages/HomePage";
import Login from "./pages/login";
import Register from "./pages/Register/Register";
import { elementsStore } from "./store";
import { Provider } from "react-redux";
import Dashboard from "./pages/Dashboard";
function App() {


  return (
    <>
      <BrowserRouter>
      <Provider store={elementsStore}>
        <Routes>
          <Route path="/workspace/:id" element={<Home/>} />
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          {/* <Route path="/" element={<div>hhahahaha</div>} /> */}
        </Routes>
        </Provider>
      </BrowserRouter>
    </>
  )
}

export default App
