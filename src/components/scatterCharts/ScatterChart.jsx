import React from "react";
import ReactEcharts from "echarts-for-react";
import data from "../../data"; // importing the data source

function ScatterChart({ x, y }) {
  
  // get the required data from the data source and store it into an array
  const xData = data.map((i) => i[x]);
  const yData = data.map((i) => i[y]);

  // Converting into 2D array (we need our data in 2D for representation)
  const seriesData = xData.map((value, i) => [value, yData[i]]);

  //Chart style
  const style = {
    height: "80vh",
    width: "95%",
  };

  const options = {
    legend: {
      left: "center",
    },
    xAxis: [
      {
        type: "value",
        name: x,
        nameLocation: "middle",
        nameTextStyle: {
          align: "center",
          padding: [10, 4, 4, 4],
        },
      },
    ],
    yAxis: {
      type: "value",
      name: y,
      nameLocation: "middle",
      nameTextStyle: {
        align: "center",
        padding: [10, 4, 4, 4],
      },
    },
    series: [
      {
        data: seriesData,
        type: "scatter",
        smooth: true,
        name: "Hue",
      },
    ],
    tooltip: {
      trigger: "axis",
    },
    title: {
      text: `Scatter Chart`,
      subtext: ``,
      left: "center",
      top: "bottom",
      textStyle: {
        fontSize: 18,
      },
    },
  };

  return <ReactEcharts option={options} style={style} />;
}

export default ScatterChart;
