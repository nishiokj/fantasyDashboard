import React from 'react';
import PropTypes from 'prop-types';

import InsightBlock from './InsightBlock';
import '../DataCard.css'; // Assuming you have a CSS file for styling

export const DataCard = ({ props }) => {
  const { header, insight_mapping, borderColor, data } = props;

  return (
    <div className="data-card" style={{ borderColor: borderColor }}>
     
      <div className="data-card-mask"></div>

      <div className="insight-blocks">
        <InsightBlock props={{
          title: insight_mapping[header],
          color: borderColor,
          data: data,
        
        }}/>
        
      </div>
    </div>
  );
};

DataCard.propTypes = {
  props: PropTypes.shape({
    header: PropTypes.string.isRequired,
    borderColor: PropTypes.string,
    data: PropTypes.object
  }).isRequired
};

export default DataCard;
