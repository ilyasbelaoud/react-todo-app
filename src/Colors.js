import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "./context";
import { v4 as uuidv4 } from "uuid";

const Colors = () => {
  const { location, setIsColorsOpen, setTasks } = useGlobalContext();
  const colorsRef = useRef(null);

  useEffect(() => {
    const { top, right } = location;
    if (colorsRef.current) {
      colorsRef.current.style.left = `${right + 30}px`;
      colorsRef.current.style.top = `${top - 20}px`;
    }
  }, [location]);

  const changeColor = (e) => {
    const color = e.target.style.backgroundColor;
    const { id } = location;
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, color: color } : task
      )
    );
    setIsColorsOpen(false);
  };

  return (
    <div ref={ colorsRef } className="color-container">
      { ["#eb1313", "#e91e63", "#673ab7", "#009688", "#4caf50", "#00bcd4", "#ff5722", "#607d8b", "#795548"].map((color, index) => (
        <button
          key={ uuidv4() }
          style={ { backgroundColor: color } }
          onClick={ changeColor }
        ></button>
      )) }
    </div>
  );
};

export default Colors;
