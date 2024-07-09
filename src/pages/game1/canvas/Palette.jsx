import './Palette.css';
import {useColorStore} from "../../../store/canvas/useColorStore";

const colorOptions = [
    "red", "orange", "yellow", "green", "blue", "purple", "pink", "brown", "gray",
    "black", "white", "cyan", "magenta", "lime", "teal", "navy", "olive", "maroon"
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

  const { color, setColor } = useColorStore();

  function changeColor(targetColor) {
    setColor(targetColor);
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
