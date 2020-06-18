import React, { useEffect, useContext } from "react";
import "./BarChart.css";
import retrieveMaxNumber from "../services/retrieveMaxNumber";
import {
  statSelectedFromPokeCardContext,
  selectedStatValueContext,
  pickStatRandomlyValueContext,
} from "../services/contextInitializers";

const styleObj = {
  background: "#8360c3  linear-gradient(to right, #2ebf91, #8360c3)",
  width: "",
  height: "",
  textAlign: "center",
  color: "cornsilk",
  display: "inline-block",
  marginRight: "0.25rem",
};

const BarChart = (props) => {
  let maxNum = props.maxNum || Number.MIN_SAFE_INTEGER;
  const pickStatRandomly = useContext(pickStatRandomlyValueContext);
  const statSelectedHandler = useContext(statSelectedFromPokeCardContext);
  let selectedStat = useContext(selectedStatValueContext);

  if (!props.maxNum) {
    maxNum = retrieveMaxNumber(props.data);
  }

  useEffect(() => {
    if (pickStatRandomly) {
      const randomlyPickedStatIndex = Math.floor(
        Math.random() * props.data.length
      );
      const currentSelectedStat = props.data[randomlyPickedStatIndex].name;
      statSelectedHandler(currentSelectedStat);
    }
  });

  const handleBarClick = (event) => {
    if (selectedStat) return;
    const name = event.target.getAttribute("name");
    statSelectedHandler && statSelectedHandler(name);
  };

  const barChartJSX = props.data.map((dataPoint) => {
    const name = dataPoint.name;
    const value = dataPoint.value;
    const newStyleObj = { ...styleObj };
    if (!newStyleObj.width) {
      newStyleObj.width = "1.25rem";
    }
    const height = value / maxNum;
    newStyleObj.height = height * 100 + "%";

    return (
      <div className="BarChart-bar-container" key={name}>
        <div
          style={newStyleObj}
          title={name + " : " + value}
          onClick={handleBarClick}
          name={name}
          className={`${selectedStat === name && "selected"}`}
        ></div>
        <p className="BarChart-bar-name">{name}</p>
      </div>
    );
  });

  return <>{barChartJSX}</>;
};

export default BarChart;
