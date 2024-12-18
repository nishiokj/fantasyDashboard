import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import PropTypes from 'prop-types';
import { ResponsiveContainer } from 'recharts';
import StatBar from './StatBar';
import { GoogleChartOptions } from 'react-google-charts';

interface UsagePieChartProps {
  title: string;
  color: string;
  data: {
    position: "QB" | "RB" | "WR" | "TE" | "K";
    player_display_name?: string;
    attempts: number;
    targets?: number;
    target_share?: number;
    week: number;
  };
}

type GraphData = Array<[string, string | number]> | Array<{ name: string; value: number }>;



export default function UsagePieChart({ props }: { props: UsagePieChartProps }) {
  const { title, color, data } = props;
  const [usage, setUsage] = useState<string | number>("");
  const [graphData, setGraphData] = useState<GraphData | null>(null);

  useEffect(() => {
    console.log("data", data);
    const { usageValue, graph } = processData(data);
    setUsage(usageValue);
    setGraphData(graph);

  }, [data]);

  const processData = (data: UsagePieChartProps['data']): {
    usageValue: string | number;
    graph: GraphData;
  } => {
    let labelPrimary: string;
    let labelSecondary: string;
    let usageValue: string | number;
    let graph: GraphData;
    let passAttempts: number;
    switch (data["position"]) {
      case "QB":
        labelPrimary = "Passes";
        labelSecondary = "Snaps";
       
        usageValue = parseInt((data["attempts"] / 100 * 100).toFixed(0));
        graph = [
          ['Play Type', 'Snaps'],
          ["Passes", data["attempts"]],
          ["Rushes", 100 - data["attempts"]]
        ];
        break;

      case "RB":
        labelPrimary = "Targets";
        labelSecondary = "Pass Attempts";
        if (!data.target_share || !data.targets) {
          throw new Error("Missing required data for RB");
        }
        usageValue = (data.target_share * 100);
        passAttempts = data.targets / data.target_share;
        console.log("passAttempts", passAttempts);
        graph = [
          ['Play Type', 'Snaps'],
          ["Non-Targets", passAttempts - data.targets],
          ["Targets", data.targets]
        ];
        break;
      case "TE":
      case "WR":
        labelPrimary = "Targets";
        labelSecondary = "Pass Attempts";
        if (!data.target_share || !data.targets) {
          throw new Error("Missing required data for TE or WR");
        }
        usageValue = (data.target_share * 100);
        passAttempts = data.targets / data.target_share;
        console.log("passAttempts", passAttempts);
        graph = [
          ['Play Type', 'Snaps'],
          ["Non-Targets", passAttempts - data.targets],
          ["Targets", data.targets]
        ];
        break;
      // case "K":
      //   labelPrimary = "Attempts";
      //   labelSecondary = "Remaining";
      //   usageValue = [data.attempts, 100 - data.attempts];
      //   graph = [
      //     { name: labelPrimary, value: data.attempts },
      //     { name: labelSecondary, value: 100 - data.attempts },
      //   ];
      //   break;

      default:
        labelPrimary = "N/A";
        labelSecondary = "N/A";
        usageValue = 0;
        graph = [{ name: "N/A", value: 100 }];
    }

    return { usageValue, graph };
  };

  const analyzeData = (): string | undefined => {
    if (data["position"] === "QB") {
        console.log("usage", usage);
      const player = { name: data["player_display_name"], 
        position: data["position"], 
        usage: usage,
        week: data["week"]
      };
      return;
    }
    console.log("error");
    return;
  }

  const options: GoogleChartOptions = {
    is3D: true,
    backgroundColor: color,
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
        data={graphData || []}
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
