import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';


// Create the Context
export const ProjectionContext = createContext();

// Create the Provider Component
export const ProjectionProvider = ({ children, playerName }) => {
  console.log("ProjectionProvider rendered with playerName:", playerName);

  const [projectionData, setProjectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect triggered with playerName:", playerName);

    if (!playerName) {
      console.log("No playerName provided to ProjectionProvider");
      setLoading(false);
      return;
    }

    const fetchProjectionData = async () => {
      console.log(`Fetching projection data for player: ${playerName}`);
      try {
        const response = await fetch(`http://localhost:5001/player/${encodeURIComponent(playerName)}/lines`);
        console.log("Fetch response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched projection data:", data);
        setProjectionData(data);
      } catch (err) {
        console.error("Error fetching projection data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectionData();
  }, [playerName]);

  return (
    <ProjectionContext.Provider value={{ projectionData, loading, error }}>
      {children}
    </ProjectionContext.Provider>
  );
};

ProjectionProvider.propTypes = {
  children: PropTypes.node.isRequired,
  playerName: PropTypes.string.isRequired,
};

export default ProjectionProvider;
