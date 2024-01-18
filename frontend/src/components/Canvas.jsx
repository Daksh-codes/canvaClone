import React, { useRef, useEffect, useState } from "react";
import useImage from 'use-image';

let canvas, ctx;
const initialZoom = 1;
const zoomStep = 0.1;




function Canvas() {
  const [elements, setElements] = useState([]);
  const [zoom, setZoom] = useState(initialZoom);

  const canvasRef = useRef();

  const handleDrop = (e) => {
    const type = e.dataTransfer.getData("type");
    drawRectangle(type, offsetX, offsetY);
  };

  function drawRectangle(type, offsetX, offsetY) {
    setElements((prev) => {
      return [
        ...prev,
        {
          index: prev.length + 1,
          type,
          position: { x: offsetX, y: offsetY },
          fill: true,
          color: "black",
          strokeColor: "yellow",
          width: 100,
          height: 100,
        },
      ];
    });
  }

  function drawElements() {
    elements.forEach((element) => {
      ctx.beginPath();
      ctx.strokeStyle = element.strokeColor;
      ctx.fillStyle = element.color;
      ctx.rect(
        element.position.x * zoom,
        element.position.y * zoom,
        element.width * zoom,
        element.height * zoom
      );
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    });
  }

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + zoomStep);
  };

  const handleZoomOut = () => {
    if (zoom > zoomStep) {
      setZoom((prevZoom) => prevZoom - zoomStep);
    }
  };

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
  }, []);

  useEffect(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawElements();
  }, [elements, zoom]);



  drawSVG(
    "https://www.svgrepo.com/show/530155/difficulty.svg"
  );
  return (
    <div className="flex items-center">
      <div className="flex flex-col">
        <div className="flex">
          <button onClick={handleZoomIn}>Zoom In</button>
          <button onClick={handleZoomOut}>Zoom Out</button>
        </div>
        <canvas
          onDrop={handleDrop}
          onDragOver={allowDrop}
          ref={canvasRef}
          className="border-2 mt-10 ml-96 m-5 border-stone-300 "
          id="myCanvas"
          width={595 * zoom}
          height={842 * zoom}
        ></canvas>
      </div>
      <p>
        {elements.map((shape, index) => (
          <li key={index}>
            {shape.type} at ({shape.position.x}, {shape.position.y})
          </li>
        ))}
      </p>
    </div>
  );
}

export { Canvas };
