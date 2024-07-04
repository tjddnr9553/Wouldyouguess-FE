import './Drawing.css'
import styled from "styled-components";
import { useEffect, useRef, useState } from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';
import { useColorStore } from '../../store/useColorStore';

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
  }, [])

  return (
      <Container ref={containerRef}>
        <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
        />
        <button onClick={() => clearCanvas(canvasRef)}>Clear Canvas</button>
        <button onClick={() => setColor('white', contextRef)}>Eraser</button>
        <button onClick={() => setColor('black', contextRef)}>Pencil</button>
        <button onClick={() => drawSquare(canvasRef)}>Square</button>
      </Container>
  )
}

export default Drawing;

const Container = styled.div`
  width: 95%;
  height: 70%;
  background-color: white;
  margin: auto;
  margin-top: 40px;
`