import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PlayerSearch from './components/PlayerSearch';
import { PlayerCard } from './components/PlayerCard';
import TeamPage from './components/TeamPage';
import './App.css';
import { colors } from './utils/teamMapping';



interface PlayerData {
  weekly: {
    headshot_url: string;
    player_display_name: string;
    position: string;
    recent_team: keyof typeof colors;
    fantasy_points_ppr: number;
    fantasy_points: number;
  };
  season: {
    fantasy_points_ppr: number;
    fantasy_points: number;
    games_played: number;
    receptions: number;
  };
}

function App() {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchPlayer = async (playerName: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:5001/player/${encodeURIComponent(playerName)}`);
      const data: PlayerData = await response.json();
      
      if (response.ok) {
        console.log(data);
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="container">
          <PlayerSearch onSearch={searchPlayer} className="search-container"/>
          {error && <p className="error">{error}</p>}
          {playerData && <PlayerCard player={playerData} />}
        </div>
      ),
    },
    {
      path: "/team/:leagueId/:team/:teamId",
      element: <TeamPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App; 