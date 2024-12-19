import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

interface ProjectionData {
  projections: {
    [key: string]: number;
  };
}

interface ProjectionContextType {
  projectionData: ProjectionData | null;
  loading: boolean;
  error: null | string;  // or null | Error if you're using Error objects
}

// Create the Context
export const ProjectionContext = React.createContext<ProjectionContextType | null>(null);

// Add at the top of ProjectionContext.tsx
interface ProjectionProviderProps {
  children: React.ReactNode;
  playerName?: string;
  teamName?: string;
  roster?: [string]
}

// Create the Provider 
export const ProjectionProvider: React.FC<ProjectionProviderProps> = ({ children, playerName, teamName, roster }) => {
  console.log("ProjectionProvider rendered with playerName:", playerName);

  const [projectionData, setProjectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect triggered with playerName:", playerName);
      const fetchProjectionTeamData = async (roster: [string]) => {
      console.log(`Fetching projection data for team: ${roster}`);
      try {
        const string_roster = roster.join(',');
        const response = await fetch(`http://localhost:5001/team/${encodeURIComponent(string_roster)}/lines`);
        console.log("Fetch response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched projection data:", data);
        setProjectionData(data);
      } catch (err: any) {
        console.error("Error fetching projection data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    const fetchProjectionData = async (playerName: string) => {
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
      } catch (err: any) {
        console.error("Error fetching projection data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    if (!playerName && !teamName) {
      console.log("No playerName provided to ProjectionProvider");
      setLoading(false);
    }

    else if(playerName) {
      fetchProjectionData(playerName);
    }
    else if(roster) {
      fetchProjectionTeamData(roster);
    }

    
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
