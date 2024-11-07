import React from 'react';
import  PlayerSearch  from './components/PlayerSearch';
import { PlayerCard }  from './components/PlayerCard';
import { SeasonStats } from './components/SeasonStats';
import './App.css';

function App() {
  const [playerData, setPlayerData] = React.useState(null);
  
  const [error, setError] = React.useState(null);
  const searchPlayer = async (playerName) => {
    try {
      const response = await fetch(`http://localhost:5001/player/${encodeURIComponent(playerName)}`);
      const data = await response.json();
      
      if (response.ok) {
        setPlayerData(data);
        setError(null);
      } else {
        setError('Player not found');
        setPlayerData(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error fetching player data');
      setPlayerData(null);
    }
  };

  return (
    <div className="container">
      <PlayerSearch onSearch={searchPlayer} className="search-container"/>
      {error && <p className="error">{error}</p>}
      {playerData && (
        <>
          <PlayerCard player={playerData} />
        </>
      )}
    </div>
  );
}

export default App; 