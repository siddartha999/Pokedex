import React from "react";
import BarChart from "../BarChart/BarChart";

const PokemonAdvancedStats = (props) => {
  const stats = props.stats;
  const chartInput = [];

  for (let dataPoint of stats) {
    const name = dataPoint.stat.name;
    const value = dataPoint.base_stat;
    chartInput.push({
      name: name,
      value: value,
    });
  }

  const chartJSX = (
    <BarChart
      data={chartInput}
      statSelected={props.statSelected}
      selectedStat={props.selectedStat}
    />
  );

  return <>{chartJSX}</>;
};

export default PokemonAdvancedStats;
