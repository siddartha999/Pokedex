import React, { useEffect } from "react";
import "./BarChart.css";
import retrieveMaxNumber from "../services/retrieveMaxNumber";

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
  const selectedStat = props.selectedStat;
  const pickStatRandomly = props.pickStatRandomly;

  if (!props.maxNum) {
    maxNum = retrieveMaxNumber(props.data);
  }

  useEffect(() => {
    if (pickStatRandomly) {
      const randomlyPickedStatIndex = Math.floor(
        Math.random() * props.data.length
      );
      props.statSelected &&
        props.statSelected(props.data[randomlyPickedStatIndex].name);
    }
  }, [pickStatRandomly, props]);

  const handleBarClick = (event) => {
    if (selectedStat) return;
    const name = event.target.getAttribute("name");
    props.statSelected && props.statSelected(name);
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
