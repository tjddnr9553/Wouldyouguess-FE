import { useCanvasStore } from "../../../store/canvas/useCanvasStore";
import {TOOL_PENCIL, TOOL_LINE, TOOL_ELLIPSE, TOOL_RECTANGLE} from './tools';

const Tools = () => {
  const {setTool, size, setSize, setFillColor, color, setColor} = useCanvasStore();

  return (
    <div>
      <div className="tools-wrap">
        <button onClick={() => setTool('clear')}>
            <img src="./images/canvas/clear_btn.png"/>
        </button>
        <button 
          onClick={() => {
            setTool(TOOL_PENCIL);
            setColor('white');
          }}
        >
            <img src="./images/canvas/erase_btn.png"/>
        </button>
        <button onClick={() => setTool(TOOL_PENCIL)}>
            <img src="./images/canvas/pencil_btn.png"/>
        </button>
        <button 
          onClick={() => {
            setTool(TOOL_RECTANGLE);
            setFillColor('');
          }}
        >
            <img src="./images/canvas/stroke_rect_btn.png"/>
        </button>
        <button 
          onClick={() => {
            setTool(TOOL_ELLIPSE);
            setFillColor('');
          }}
        >
            <img src="./images/canvas/stroke_circle_btn.png"/>
        </button>
        <button 
          onClick={() => {
            setTool(TOOL_RECTANGLE);
            setFillColor(color);
          }}
        >
            <img src="./images/canvas/fill_rect_btn.png"/>
        </button>
        <button 
          onClick={() => {
            setTool(TOOL_ELLIPSE);
            setFillColor(color);
          }}
        >
            <img src="./images/canvas/fill_circle_btn.png"/>
        </button>
        <div className="PB-range-slider-div">
            <input type="range" min="0" max="16" step="1" value={size} className="PB-range-slider" onChange={(e) => setSize(e.target.value)}></input>
        </div>
      </div>
    </div>
  )
}

export default Tools;