import React from 'react';
import PropTypes from 'prop-types';

import InsightBlock from './InsightBlock';
import '../DataCard.css'; // Assuming you have a CSS file for styling

export const DataCard = ({ props }) => {
  const { header, insight_mapping, borderColor, player } = props;

  return (
    <div className="data-card" style={{ borderColor: borderColor }}>
     
      <div className="data-card-mask"></div>

      <div className="insight-blocks">
        <InsightBlock props={{
          title: insight_mapping[header],
          color: borderColor,
          player: player,
        
        }}/>
        
      </div>
    </div>
  );
};

DataCard.propTypes = {
  props: PropTypes.shape({
    header: PropTypes.string.isRequired,
    borderColor: PropTypes.string,
    player: PropTypes.object
  }).isRequired
};

export default DataCard;
