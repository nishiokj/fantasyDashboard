import React from 'react';
import PropTypes from 'prop-types';
import '../InsightBlock.css';
import UsagePieChart from './UsagePieChart';

const InsightBlock = ({ props }) => {
  const {title,color, data } = props;
  
  const renderContent = () => {
    if (title === "RECENT USAGE") {
      return <UsagePieChart props={{
        title: title,
        color: color,
        data: data
      }} />;
    }
  }
  console.log(data);
  return (
    <div className="insight-block" style={{ borderColor: color, backgroundColor: color }}>
      <header className="insight-block-header" style={{ borderBottomColor: color, backgroundColor: color }}>
        {title}
      </header>
      <div className="insight-block-mask"></div>
      <div className="insight-block-content">
        {renderContent()}
      </div>
    </div>
  );
};

InsightBlock.propTypes = {
  props: PropTypes.shape({
    title: PropTypes.string.isRequired,
    color: PropTypes.string,
    data: PropTypes.object
  }).isRequired
};

export default InsightBlock;
