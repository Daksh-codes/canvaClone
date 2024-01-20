import React from 'react'
// import rectangle from "../../assets/square-outline-xxl.png"
import rectangle from "../../assets/greyRectangle.png"

function SideBarShapes() {
  return (
    <div className='flex flex-wrap'>
      <div className='w-1/3'>
        <img src={rectangle} alt="rectangle" className='w-1/2' />
      <h3>Rectangle</h3>
      </div>
      

    </div>

  )
}

export default SideBarShapes