import { useEffect, useRef } from "react";
import "./Planet.css";
import { gsap, Power1 } from "gsap";

const Planet = ({ style, id, min, max, text, onClick }) => {
  const imagePath = `/images/planet/${id}.png`;

  // `.toFixed()`를 통해 반환된 '문자 데이터'를,
  // `parseFloat()`을 통해 소수점을 가지는 '숫자 데이터'로 변환
  const random = (min, max) => {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
  };

  const floatingObj = (selector, delay, size) => {
    gsap.to("." + selector, {
      duration: random(1.5, 2.5),
      delay: random(0, delay),
      y: size,
      repeat: -1,
      yoyo: true,
      ease: Power1.easeInOut,
    });
  };

  useEffect(() => {
    floatingObj(id, min, max);
  }, []);

  return (
    <div className={`${id} item-hints`} style={style}>
      <div className="hint" data-position="4">
        <span className="hint-radius"></span>
        <span className="hint-dot">
          <img src={imagePath} alt="planet image" onClick={onClick} />
        </span>
        <div className="hint-content do--split-children">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Planet;
