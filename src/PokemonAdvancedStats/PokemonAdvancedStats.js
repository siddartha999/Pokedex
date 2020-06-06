import React from "react";
import InvertedBarChart from "../InvertedBarChart/InvertedBarChart";
import StraightBarChart from "../StraightBarChart/StraightBarChart";

const PokemonAdvancedStats = (props) => {
  const stats = props.stats;
  const chartInput = [];
  const isChartInverted = props.invertedChart;

  for (let dataPoint of stats) {
    const name = dataPoint.stat.name;
    const value = dataPoint.base_stat;
    chartInput.push({
      name: name,
      value: value,
    });
  }

  const invertedChartJSX = <InvertedBarChart data={chartInput} />;
  const straightChartJSX = (
    <StraightBarChart
      data={chartInput}
      statSelected={props.statSelected}
      isStatSelected={props.isStatSelected}
    />
  );

  return <>{isChartInverted ? invertedChartJSX : straightChartJSX}</>;
};

export default PokemonAdvancedStats;
