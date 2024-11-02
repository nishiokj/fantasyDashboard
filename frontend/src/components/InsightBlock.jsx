import React from 'react';
import PropTypes from 'prop-types';
import '../InsightBlock.css'; // Ensure you're importing PropTypes

const InsightBlock = ({ title, content, color }) => {
  return (
    <div className="insight-block" style={{ borderColor: color,backgroundColor: color }}>
      <header className="insight-block-header" style={{ borderBottomColor: color, backgroundColor: color }}>
        {title}
      </header>
      <div className="insight-block-mask"></div>
      <div className="insight-block-content">
        {/* Add your insight content here */}
        Content for {title}
      </div>
    </div>
  );
};

InsightBlock.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  color: PropTypes.string
};

InsightBlock.defaultProps = {
    color: '#ddd' // Default color if none is provided
};

export default InsightBlock;
