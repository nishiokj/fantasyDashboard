import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './VegasProjections.css'; // Assuming you have corresponding CSS

/**
 * VegasProjections Component
 * 
 * This component is responsible for fetching and displaying Vegas projections
 * based on the player's display name. It encapsulates conditional rendering
 * logic based on the player's position.
 */
const VegasProjections = ({ playerDisplayName }) => {
  const [projectionData, setProjectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    /**
     * Fetch projection data for the given player.
     */
    const fetchProjections = async () => {
      try {
        const response = await fetch(`http://localhost:5001/player/${encodeURIComponent(playerDisplayName)}/lines`);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setProjectionData(data);
      } catch (err) {
        console.error('Failed to fetch Vegas projections:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProjections();
  }, [playerDisplayName]);

  if (loading) {
    return <div className="vegas-projections">Loading Vegas projections...</div>;
  }

  if (error) {
    return <div className="vegas-projections">Failed to load Vegas projections.</div>;
  }

  /**
   * Conditional rendering based on the player's position.
   */
  const renderProjections = () => {
    const position = projectionData['position'];
    const projections = projectionData['projections'];
    switch (position) {
      case 'QB':
        return (
          <div>
            <div><strong>Player:</strong> {playerDisplayName}</div>
            <div><strong>Passing Yards:</strong> {projections['passing_yards']}</div>
            <div><strong>Touchdowns:</strong> {projections['passing_touchdowns']}</div>
          </div>
        );
      case 'RB':
        return (
          <div>
            <div><strong>Player:</strong> {playerDisplayName}</div>
            <div><strong>Rushing Yards:</strong> {projections['rushing_yards']}</div>
            <div><strong>Touchdowns:</strong> {projections['rushing_touchdowns']}</div>
          </div>
        );
      case 'WR':
        return (
          <div>
            <div><strong>Player:</strong> {playerDisplayName}</div>
            <div><strong>Receiving Yards:</strong> {projections['receiving_yards']}</div>
            <div><strong>Touchdowns:</strong> {projections['receiving_touchdowns']}</div>
          </div>
        );
      default:
        return (
          <div>
            <div><strong>Player:</strong> {playerDisplayName}</div>
            <div><strong>Total Yards:</strong> {projections['total_yards']}</div>
            <div><strong>Touchdowns:</strong> {projections['touchdowns']}</div>
          </div>
        );
    }
  };

  return (
    <div className="vegas-projections">
      <h2>Vegas Projections for {playerDisplayName}</h2>
      {renderProjections()}
    </div>
  );
};

VegasProjections.propTypes = {
  playerDisplayName: PropTypes.string.isRequired,
};

export default VegasProjections;
