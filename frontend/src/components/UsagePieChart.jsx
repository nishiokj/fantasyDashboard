import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import PropTypes from 'prop-types';
import { ResponsiveContainer } from 'recharts';
import StatBar from './StatBar';
export default function UsagePieChart({ props }) {
  const { title, color, data } = props;
  const [usage, setUsage] = useState("");
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    console.log("data", data);
    const { usageValue, graph } = processData(data);
    setUsage(usageValue);
    setGraphData(graph);

  }, [data]);

  const processData = (data) => {
    let labelPrimary;
    let labelSecondary;
    let usageValue;
    let graph;
    let passAttempts;
    switch (data["position"]) {
      case "QB":
        labelPrimary = "Passes";
        labelSecondary = "Snaps";
       
        usageValue = parseFloat((data["attempts"] / 100) * 100).toFixed(0);
        graph = [
          ['Play Type', 'Snaps'],
          ["Passes", data["attempts"]],
          ["Rushes", 100 - data["attempts"]]
        ];
        break;

      case "RB":
        labelPrimary = "Targets";
        labelSecondary = "Pass Attempts";
        usageValue = (data['target_share'].toFixed(2) * 100);
        passAttempts = data["targets"] / data["target_share"];
        console.log("passAttempts", passAttempts);
        graph = [
          ['Play Type', 'Snaps'],
          ["Non-Targets", passAttempts - data["targets"]],
          ["Targets", data["targets"]]
        ];
        break;
      case "TE":
      case "WR":
        labelPrimary = "Targets";
        labelSecondary = "Pass Attempts";
        usageValue = (data['target_share'].toFixed(2) * 100);
        passAttempts = data["targets"] / data["target_share"];
        console.log("passAttempts", passAttempts);
        graph = [
          ['Play Type', 'Snaps'],
          ["Non-Targets", passAttempts - data["targets"]],
          ["Targets", data["targets"]]
        ];
        break;
      case "K":
        labelPrimary = "Attempts";
        labelSecondary = "Remaining";
        usageValue = [data["attempts"], 100 - data["attempts"]];
        graph = [
          { name: labelPrimary, value: data["attempts"] },
          { name: labelSecondary, value: 100 - data["attempts"] },
        ];
        break;

      default:
        labelPrimary = "N/A";
        labelSecondary = "N/A";
        usageValue = [0, 0];
        graph = [{ name: "N/A", value: 100 }];
    }

    return { usageValue, graph };
  };

  const analyzeData = () => {
    if (data["position"] === "QB") {
        console.log("usage", usage);
      const player = { name: data["player_display_name"], 
        position: data["position"], 
        usage: usage,
        week: data["week"]
      };
      return MessageGenerator("usage", player);
    }
    console.log("error");
    return;
  }

  const options = {
    is3D: true,
    backgroundColor: {
      fill: color, // Background color
    },
    slices: {
      1: { offset: 0.25 },
    },
   
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "#ffffff",
        fontSize: "15",
        fontName: "calibre",
      },
    },
    colors: ["#389482", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
  }

  return (
    <div  >
      <ResponsiveContainer width="100%" height="auto" >
      <Chart
        chartType="PieChart"
        data={graphData}
        options={options}   
        width={'100%'}
        height={'100%'}
      />
      </ResponsiveContainer>
      <StatBar    
        props= {{
            values: {
                "Week": data["week"],
                "Usage": `${usage}%`,
                "Rank": 10,
            },
            paddingTop: "1vw"
        }}
      />
    </div>

     
    
  );
}

UsagePieChart.propTypes = {
  props: PropTypes.shape({
    title: PropTypes.string,
    color: PropTypes.string,
    data: PropTypes.object
  }).isRequired
}
