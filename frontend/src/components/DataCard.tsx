import React from 'react';
import PropTypes from 'prop-types';

import InsightBlock from './InsightBlock';
import '../DataCard.css'; // Assuming you have a CSS file for styling

interface DataCardProps<T = any> {
  header: string;
  insightMapping: Record<string, string>;
  borderColor: string;
  data: T;
}

export const DataCard = ( props: DataCardProps ) => {
  const { header, insightMapping, borderColor, data } = props;

  return (
    <div className="data-card" style={{ borderColor: borderColor }}>
     
      <div className="data-card-mask"></div>

      <div className="insight-blocks">
        <InsightBlock 
          title={insightMapping[header]}
          color={borderColor}
          data={data}
        />
      </div>
    </div>
  );
};


export default DataCard;
