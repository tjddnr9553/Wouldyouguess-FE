import { useCanvasStore } from "../../../store/canvas/useCanvasStore";
import {TOOL_PENCIL, TOOL_LINE, TOOL_ELLIPSE, TOOL_RECTANGLE} from './tools';

const Tools = () => {
  const {setTool} = useCanvasStore();

  return (
    <div>
      <div className="tools-wrap">
        <button onClick={() => setTool('clear')}>
            <img src="./images/canvas/clear_btn.png"/>
        </button>
        <button onClick={() => setTool('erase')}>
            <img src="./images/canvas/erase_btn.png"/>
        </button>
        <button onClick={() => setTool(TOOL_PENCIL)}>
            <img src="./images/canvas/pencil_btn.png"/>
        </button>
        <button onClick={() => setTool(TOOL_RECTANGLE)}>
            <img src="./images/canvas/stroke_rect_btn.png"/>
        </button>
        <button onClick={() => setTool(TOOL_ELLIPSE)}> 
            <img src="./images/canvas/stroke_circle_btn.png"/>
        </button>
        <button onClick={() => setTool('fill_rect')}>
            <img src="./images/canvas/fill_rect_btn.png"/>
        </button>
        <button onClick={() => setTool('fill_circle')}>
            <img src="./images/canvas/fill_circle_btn.png"/>
        </button>
        <div className="PB-range-slider-div">
            <input type="range" min="0" max="50" step="1" className="PB-range-slider" ></input>
        </div>
      </div>
    </div>
  )
}

export default Tools;