import './Palette.css';
import { useCanvasStore } from '../../../store/canvas/useCanvasStore';

const colorOptions = [
    "red", "orange", "yellow", "green", "blue", "purple", "pink", "brown", "gray",
    "black", "white", "cyan",
];

const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
};

const Palette = () => {
  const colorGroups = chunkArray(colorOptions, 3);

  const { setColor, setFillColor } = useCanvasStore();

  function changeColor(targetColor) {
    setColor(targetColor);
    setFillColor(targetColor);
  }

  return (
    <div className="palette">
        {colorGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="color-group">
                {group.map((color, colorIndex) => (
                    <div
                        key={colorIndex}
                        className="color-options"
                        style={{ backgroundColor: color }}
                        onClick={() => changeColor(color)}
                    ></div>
                ))}
            </div>
        ))}
    </div>
  )
}

export default Palette;
