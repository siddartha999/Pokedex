import React from "react";
import retrieveMaxNumber from "../services/retrieveMaxNumber";
import "./InvertedBarChart.css";

const styleObj = {
  background: "#8360c3  linear-gradient(to right, #2ebf91, #8360c3)",
  marginTop: "1rem",
  width: "",
  height: "",
  textAlign: "center",
  color: "cornsilk",
};

const InvertedBarChart = (props) => {
  let max_num = props.max_num || Number.MIN_SAFE_INTEGER;

  if (!props.max_num) {
    max_num = retrieveMaxNumber(props.data);
  }

  const barChartJSX = props.data.map((dataPoint) => {
    const name = dataPoint.name;
    const value = dataPoint.value;
    const newStyleObj = { ...styleObj };
    const width = value / max_num;
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
