import './Drawing.css'
import styled from "styled-components";
import { useEffect, useRef, useState } from 'react';
import {useCanvasStore} from "../../../store/canvas/useCanvasStore.js";
import {useColorStore} from "../../../store/canvas/useColorStore.js";

const Drawing = () => {
  const { prepareCanvas, startDrawing, finishDrawing, draw, clearCanvas, drawSquare } = useCanvasStore();
  const { color, setColor } = useColorStore();
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  // 부모의 크기를 가져오기 위해서 containerRef 객체 생성.
  const containerRef = useRef(null);

  // 컴포넌트가 랜더링 되면 canvas 기본 세팅.
  useEffect(() => {
    prepareCanvas(canvasRef, containerRef, contextRef);
    drawSquare(contextRef);
  }, [])


    const changeLineWidth = (event) => {
        // setLineWidth(event.target.value);
    }

  return (
      <Container ref={containerRef}>
        <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
        />
        <div className="tools-wrap">
            <button onClick={() => clearCanvas(canvasRef)}>
                <img src="./images/canvas/clear_btn.png"/>
            </button>
            <button onClick={() => setColor('white', contextRef)}>
                <img src="./images/canvas/erase_btn.png"/>
            </button>
            <button onClick={() => setColor('black', contextRef)}>
                <img src="./images/canvas/pencil_btn.png"/>
            </button>
            <button onClick={() => drawSquare(canvasRef)}>
                <img src="./images/canvas/stroke_rect_btn.png"/>
            </button>
            <button>
                <img src="./images/canvas/stroke_circle_btn.png"/>
            </button>
            <button>
                <img src="./images/canvas/fill_rect_btn.png"/>
            </button>
            <button>
                <img src="./images/canvas/fill_circle_btn.png"/>
            </button>
            <div className="PB-range-slider-div">
                <input type="range" min="0" max="50" step="1" className="PB-range-slider" onChange={changeLineWidth} ref={contextRef}></input>
            </div>
        </div>
      </Container>
  );
}

export default Drawing;

const Container = styled.div`
  width: 95%;
  height: 70%;
  background-color: white;
  margin: auto;
  margin-top: 60px;
  border-radius: 12px;
`