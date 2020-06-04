import React from "react";
import "./InvertedBarChart.css";

const styleObj = {
  background: "#8360c3  linear-gradient(to right, #2ebf91, #8360c3)",
  marginTop: "1rem",
  width: "",
  height: "1.5rem",
  textAlign: "center",
  color: "cornsilk",
};

const findMaxNumber = (data) => {
  let val = Number.MIN_SAFE_INTEGER;
  for (let point of data) {
    if (val < point.value) {
      val = point.value;
    }
  }
  return val;
};

const InvertedBarChart = (props) => {
  let max_num = props.max_num || Number.MIN_SAFE_INTEGER;

  if (!props.max_num) {
    max_num = findMaxNumber(props.data);
  }

  const barChartJSX = props.data.map((dataPoint) => {
    const name = dataPoint.name;
    const value = dataPoint.value;
    const width = value / max_num;
    const newStyleObj = { ...styleObj };
    newStyleObj.width = width * 100 + "%";
    return (
      <div style={newStyleObj} title={name + " : " + value} key={name}>
        {name}
      </div>
    );
  });

  return <>{barChartJSX}</>;
};

export default InvertedBarChart;
