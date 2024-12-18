import React from 'react';
import { colors } from '../utils/teamMapping';
import '../PlayerCard.css';
import SportsFootballOutlinedIcon from '@mui/icons-material/SportsFootballOutlined';
import StatBar from './StatBar';
import DataCard from './DataCard';
import { headerMapping } from '../utils/headerMapping';
import { ProjectionProvider } from './ProjectionContext';


interface WeeklyData {
  player_display_name: string;
  position: string;
  recent_team: keyof typeof colors;
  fantasy_points_ppr: number;
  fantasy_points: number;
  headshot_url: string;
}
interface SeasonData {
 fantasy_points_ppr: number;
 fantasy_points: number;
 games_played: number;
}
// Add interface for Player props
interface Player {
  weekly: WeeklyData;
  season: SeasonData;
}


interface PlayerCardProps {
  player: Player;
}

// Convert to TypeScript component
export function PlayerCard({ player }: PlayerCardProps) {
  console.log(player);
  return (
    <ProjectionProvider playerName={player.weekly.player_display_name}>
      <div
      className="player-card"
      style={{
        borderColor: '#0000000',
        backgroundColor: '#000000',
        position: 'relative',
      }}
    >
      {/* Overlay Mask */}
      <div className="player-card-mask"></div>

      <div className="header" style={{backgroundColor: colors[player.weekly.recent_team as keyof typeof colors]}}>
        <img
          src={player.weekly.headshot_url}
          alt={`${player.weekly.player_display_name.toUpperCase()} Headshot`}
          style={{ borderColor: colors[player.weekly.recent_team as keyof typeof colors],
            
           }}
        />
        <div className="player-info"> 
          <h2><div className="player-name-text">{player.weekly.player_display_name.toUpperCase()}</div>
            {/* <div className="player-name-icon">
              <SportsFootballOutlinedIcon />
            </div> */}
          </h2>
          <StatBar 
            props={{
                values: {
                    "Pos": player.weekly.position,
                    "PPG": player.season.fantasy_points_ppr / player.season.games_played || player.season.fantasy_points / player.season.games_played || 0,
                    "Team": player.weekly.recent_team
                },
                paddingTop: "0vw"
            }}
          />

        </div>
      </div>
      <div className="data-cards-container">
        {(Object.keys(headerMapping) as Array<keyof typeof headerMapping>).map((key) => (
          Object.keys(headerMapping[key]).map((subkey) => (
            <DataCard 
              header={subkey}
              insightMapping={headerMapping[key]}
              borderColor={colors[player.weekly.recent_team as keyof typeof colors]}
              data={player}
            />
            
          ))
        ))}

      </div>
    </div>
    </ProjectionProvider>
  );
}

// Remove PropTypes validation as TypeScript handles type checking
export default PlayerCard;