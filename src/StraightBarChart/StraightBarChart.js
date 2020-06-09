import React from "react";
import "./StraightBarChart.css";
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

const StraightBarChart = (props) => {
  let maxNum = props.maxNum || Number.MIN_SAFE_INTEGER;
  const isStatSelected = props.isStatSelected;

  if (!props.maxNum) {
    maxNum = retrieveMaxNumber(props.data);
  }

  const handleBarClick = (event) => {
    if (isStatSelected) return;
    const name = event.target.getAttribute("name");
    props.statSelected(name);
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
      <div className="StraightBarChart-bar-container" key={name}>
        <div
          style={newStyleObj}
          title={name + " : " + value}
          onClick={handleBarClick}
          name={name}
        ></div>
        <p className="StraightBarChart-bar-name">{name}</p>
      </div>
    );
  });

  return <>{barChartJSX}</>;
};

export default StraightBarChart;
