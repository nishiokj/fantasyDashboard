import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';
import { Chart } from "react-google-charts";
import PropTypes from 'prop-types';
import { ResponsiveContainer } from 'recharts';


export default function UsagePieChart({props}) {
  const {title, color, data } = props;

  let labelPrimary;
  let labelSecondary;
  const determineData = () => {
    switch (data["position"]) {
      case "QB":
        labelPrimary = "Passes";
        labelSecondary = "Snaps";
        return [
            ['Play Type', 'Snaps'],
            ["Passes", 100 - data["attempts"]],
            ["Rushes", 10]
        ]

      case "RB":
        labelPrimary = "Carries";
        labelSecondary = "Run Plays";
        return [
          { name: labelPrimary, value: data["carries"] },
          { name: labelSecondary, value: data["runPlays"] - data["carries"] },
        ];
      case "WR":
        labelPrimary = "Targets";
        labelSecondary = "Pass Attempts";
        return [
          { name: labelPrimary, value: data["targets"] },
          { name: labelSecondary, value: data["passAttempts"] - data["targets"] },
        ];
      case "K":
        labelPrimary = "Attempts";
        labelSecondary = "Remaining";
        return [
          { name: labelPrimary, value: data["attempts"] },
          { name: labelSecondary, value: 100 - data["attempts"] },
        ];
      default:
        labelPrimary = "N/A";
        labelSecondary = "N/A";
        return [{ name: "N/A", value: 100 }];
    }
  };
  const options = {
    title: "Play Type",
    is3D: true,
    backgroundColor: {
      fill: color,    // Background color
    },
    slices: {
        1: { offset: 0.25 }, 
      },
    titleColor: "#ffffff",
    titleTextStyle: {
      fontSize: "1.5vw",
      color: "#ffffff",
      fontWeight: "bold",
    },
    legend: {
        position: "bottom",
        alignment: "center",
        textStyle: {
          color: "#ffffff",
          fontSize: "1.5vw",
        },
      },
    
      colors: ["#389482", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
  }
  console.log(color);
  return (
    <ResponsiveContainer width="100%" height="auto" >
    <Chart
      chartType="PieChart"
      data={determineData()}
      options={options}
      width={'100%'}
      height={'100%'}
    />
    </ResponsiveContainer>
    
  );
 
};
UsagePieChart.propTypes = {
    props: PropTypes.shape({
      title: PropTypes.string,
      color: PropTypes.string,
      data: PropTypes.object
    }).isRequired
  }
/*

  
  return (
    <div className="pie-chart-container"
      ref={containerRef}

    >
      {containerSize.width > 10 && containerSize.height > 10 && ( // Only render chart when size is calculated
        <PieChart
          series={[
            {
              data: chartData,
              innerRadius,
              outerRadius,
              paddingAngle: 2,
              cornerRadius: 1,
              startAngle: 0,
              endAngle: 360,
              cx: centerX,
              cy: centerY,
              label: {
                visible: true,
                position: 'outside',
                formatter: ({ datum }) => `${datum.name}: ${datum.value}`,
                fontSize: size * 0.05,
                color: '#000',
                connector: {
                  enabled: true,
                  style: {
                    stroke: '#000',
                    strokeWidth: 1,
                  },
                },
              },
              tooltip: {
                enabled: true,
                formatter: ({ datum }) => `${datum.name}: ${datum.value}`,
              },
              colors: ['#3f5105', '#c0c0c0'],
            },
          ]}
          width={containerSize.width}
          height={containerSize.height}
        />
      )}
    </div>
  );
}
  */