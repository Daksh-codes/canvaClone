import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import {Canvas} from '../components/Canvas'
import Canvas2 from '../components/Canvas2'
import CanvasWorkspace from '../components/CanvasWorkspace'
import Navbar from '../components/navbar'

function Home() {

  const [elements , setElements ] = useState([])

  return (
    <div>
        <Navbar  />
        <SideBar elements={elements} setElements={setElements}/>
        <CanvasWorkspace elements={elements} setElements={setElements}/>

    </div>
  )
}

export default Home