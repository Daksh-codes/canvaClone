// Temp.js

import React, { useState } from 'react';


const DraggableShape = ({ type, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: '#3498db',
        marginBottom: '10px',
        cursor: 'grab',
      }}
    ></div>
  );
};

const Canvas = ({ onDrop }) => {
  const handleDrop = (e) => {
    const type = e.dataTransfer.getData('type');
    const offsetX = e.clientX - e.target.getBoundingClientRect().left;
    const offsetY = e.clientY - e.target.getBoundingClientRect().top;
    onDrop(type, { x: offsetX, y: offsetY });
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={allowDrop}
      style={{
        flexGrow: 1,
        height: '100vh',
        backgroundColor: '#ffffff',
        position: 'relative',
      }}
    >
      <canvas
        id="custom-canvas"
        width="500"
        height="300"
        style={{
          border: '1px solid #000',
        }}
      ></canvas>
      <h2 style={{ textAlign: 'center' }}>Canvas Content</h2>
    </div>
  );
};

const Temp = () => {
  const [shapes, setShapes] = useState([]);

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('type', type);
  };

  const handleDrop = (type, position) => {
    setShapes((prevShapes) => [...prevShapes, { type, position }]);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '100px', height: '100vh', backgroundColor: '#f0f0f0', padding: '10px' }}>
        <DraggableShape type="shape1" onDragStart={handleDragStart} />
        <DraggableShape type="shape2" onDragStart={handleDragStart} />
        {/* Add more shapes as needed */}
      </div>
      <Canvas onDrop={handleDrop} />
      <div>
        <h2>Shapes on Canvas:</h2>
        <ul>
          {shapes.map((shape, index) => (
            <li key={index}>
              {shape.type} at ({shape.position.x}, {shape.position.y})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Temp;
