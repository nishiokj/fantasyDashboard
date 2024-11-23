import React from 'react';
import PropTypes from 'prop-types';
import '../InsightBlock.css';
import UsagePieChart from './UsagePieChart';
import StatBar from './StatBar';
import { ProjectionContext } from './ProjectionContext';
import { useContext } from 'react';
/**
 * InsightBlock Component
 * 
 * This component serves as a container for various insight widgets such as
 * UsagePieChart and StatBar. It handles the styling and layout
 * based on the provided props.
 */
const InsightBlock = ({ props }) => {
  const { title, color, player: initialData, position } = props;


  /**
   * Renders the appropriate content based on the title.
   */
  const renderContent = () => {
    if (title === "RECENT USAGE") {
      return (
        <UsagePieChart
          props={{
            title: title,
            color: color,
            data: initialData,
          }}
          
        />
      );
    }

    if (title === "VEGAS PROJECTIONS") {

      const { projectionData, loading, error } = useContext(ProjectionContext);
      if (loading) {
        return <div>Loading data...</div>;
      }
      
      if (error) {
        return <div>Error loading data: {error.message}</div>;
      }
      const shortenedTitles = {
        "anytime_td": "TD",
        "interceptions": "INTS",
        "passing_tds": "PASS TDS",
        "passing_yards": "PASS YDS",
        "rushing_tds": "RUSH TD",
        "rushing_yards": "RUSH YDS",
        "receiving_tds": "REC TD",
        "receiving_yards": "REC YDS",
        "PPRProjection": "PPR PTS"
      }
      console.log(projectionData);
      // Assuming you have a specific component or handling for VEGAS PROJECTIONS
      const entries = Object.entries(projectionData['projections']);
      const [topRow, bottomRow] = entries.reduce((acc, [stat, projection], index) => {
        const shortenedStat = shortenedTitles[stat] || stat;

        acc[index <= 2 ? 0 : 1][shortenedStat] = projection;
        return acc;
      }, [{}, {}]);
      return (
        <div className="projection-block">
        <StatBar 
          props={{
              values: topRow,
            title: title,
            color: color,
        
          }}
        />

        <StatBar
        props = {{
          values: bottomRow,
          title: title,
          color: color,
  
          }}
          />
        </div>
      );
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

InsightBlock.propTypes = {
  props: PropTypes.shape({
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    position: PropTypes.string, // Add position prop if needed
    player: PropTypes.shape({
      player_display_name: PropTypes.string.isRequired,
      // Include other player-related PropTypes if necessary
    }).isRequired,
  }).isRequired,
};

export default InsightBlock;
