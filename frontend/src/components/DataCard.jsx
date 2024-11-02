import React from 'react';
import PropTypes from 'prop-types';

import InsightBlock from './InsightBlock';
import '../DataCard.css'; // Assuming you have a CSS file for styling

export function DataCard({ header, insight_mapping, borderColor }) {
  return (
    <div className="data-card" style={{ borderColor: borderColor }}>
     
      <div className="data-card-mask"></div>

      <div className="insight-blocks">
        <InsightBlock title={insight_mapping['Insight1']} color={borderColor} />
        <InsightBlock title={insight_mapping['Insight2']} color={borderColor} />
        <InsightBlock title={insight_mapping['Insight3']} color={borderColor} />
      </div>
    </div>
  );
};
DataCard.propTypes = {
    header: PropTypes.string.isRequired,
    borderColor: PropTypes.string
  };
  

export default DataCard;
