import "./Palette.css";
import { useCanvasStore } from "../../../store/canvas/useCanvasStore";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

const Palette = () => {
  const { setColor, setFillColor, tool, setTool, mode } = useCanvasStore();

  function changeColor(targetColor) {
    if (mode === "fill") {
      tool === "clear" && setTool("pencil");
      setColor(targetColor);
      setFillColor(targetColor);
    }
    setColor(targetColor);
    setCurrentColor(targetColor);
  }

  const [color, setCurrentColor] = useState("#000000");

  return (
    <div className="palette">
      <HexColorPicker color={color} onChange={changeColor} />
    </div>
  );
};

export default Palette;
