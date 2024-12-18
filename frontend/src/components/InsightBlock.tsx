import React from 'react';
import '../InsightBlock.css';
import UsagePieChart from './UsagePieChart';
import StatBar from './StatBar';
import { ProjectionContext } from './ProjectionContext';
import { useContext } from 'react';

interface ProjectionData {
  projections: {
    [key: string]: number;
  };
}

interface InsightBlockProps<T = any> {
  title: string;
  color: string;
  position?: string;
  data: T;
}

interface StatValues {
  [key: string]: string | number;
}

interface ProjectionContextType {
  projectionData: ProjectionData | null;
  loading: boolean;
  error: Error | null;
}

/**
 * InsightBlock Component
 * 
 * This component serves as a container for various insight widgets such as
 * UsagePieChart and StatBar. It handles the styling and layout
 * based on the provided props.
 */
const InsightBlock = (props: InsightBlockProps) => {
  const { title, color, data, position } = props;

  const shortenedTitles: { [key: string]: string } = {
    "anytime_td": "TD",
    "interceptions": "INTS",
    "passing_tds": "PASS TDS",
    "passing_yards": "PASS YDS",
    "rushing_tds": "RUSH TD",
    "rushing_yards": "RUSH YDS",
    "receiving_tds": "REC TD",
    "receiving_yards": "REC YDS",
    "PPRProjection": "PPR"
  };

  /**
   * Renders the appropriate content based on the title.
   */
  const renderContent = () => {
    if (title === "RECENT USAGE") {      
      return (
        <UsagePieChart
          props={{
            title,
            color,
            data
          }}
        />
      );
    }

    if (title === "VEGAS PROJECTIONS") {

      const context = useContext(ProjectionContext);
      if (!context) return null;
      const { projectionData, loading, error } = context;
      if (loading) {
        return <div>Loading data...</div>;
      }
    
      if(projectionData) {
      const entries = Object.entries(projectionData.projections);
      const [topRow, bottomRow] = entries.reduce<[StatValues, StatValues]>(
        (acc, [stat, projection], index) => {
          const shortenedStat = shortenedTitles[stat] || stat;
          let projectionValue: string | number = projection;
          
          if (stat === "anytime_td" && projection > 0) {
            projectionValue = `+${projection}`;
          }

          acc[index <= 2 ? 0 : 1][shortenedStat] = projectionValue;
          return acc;
        },
        [{}, {}]
      );
      return (
        <div className="projection-block">
        <StatBar 
          props={{
            values: topRow,
          paddingTop: "0vw"
        }}
      />

      <StatBar
      props = {{
        values: bottomRow,
        paddingTop: "0vw"

        }}
        />
      </div>
    );
      }
      if(!projectionData) {
        return <div>No projection data available</div>;
      }
    }
  };

  return (
    <div className="insight-block" style={{ borderColor: color, backgroundColor: color }}>
      <header
        className="insight-block-header"
        style={{ borderBottomColor: color, backgroundColor: color }}
      >
        {title}
      </header>
      <div className="insight-block-mask"></div>
      <div className="insight-block-content">{renderContent()}</div>
    </div>
  );
};
export default InsightBlock;
