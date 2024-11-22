import React from 'react';
import PropTypes from 'prop-types';
import '../InsightBlock.css';
import UsagePieChart from './UsagePieChart';
import StatBar from './StatBar';
import { ProjectionContext } from './ProjectionContext';
/**
 * InsightBlock Component
 * 
 * This component serves as a container for various insight widgets such as
 * UsagePieChart and StatBar. It handles the styling and layout
 * based on the provided props.
 */
const InsightBlock = ({ props }) => {
  const { title, color, player: initialData, position } = props;
  const { projectionData } = React.useContext(ProjectionContext);

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
      console.log(projectionData);
      // Assuming you have a specific component or handling for VEGAS PROJECTIONS
      return (
        <StatBar
          props={{
            values: projectionData['projections'],
            title: title,
            color: color,
          }}
        />
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
