import React from 'react';
import PropTypes from 'prop-types';
import DataCard from './DataCard';
import { headerMapping } from '../utils/headerMapping';
import { colors, teamMapping } from '../utils/teamMapping';
import '../PlayerCard.css';
import SportsFootballOutlinedIcon from '@mui/icons-material/SportsFootballOutlined';
import StatBar from './StatBar';
import { ProjectionProvider } from './ProjectionContext';


export function PlayerCard({ player }) {
  return (
    <ProjectionProvider playerName={player.player_display_name}>
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

      <div className="header" style={{backgroundColor: colors[player.recent_team]}}>
        <img
          src={player.headshot_url}
          alt={`${player.player_display_name.toUpperCase()} Headshot`}
          style={{ borderColor: colors[player.recent_team],
            
           }}
        />
        <div className="player-info"> 
          <h2>{player.player_display_name.toUpperCase()}
            <div className="player-name-icon">
              <SportsFootballOutlinedIcon />
            </div>
          </h2>
          <StatBar props={{
            values: {
                "Pos": player.position,
                "PPG": player.fantasy_points_ppr.toFixed(1) || player.fantasy_points.toFixed(1) || 0,
                "Team": player.recent_team
            },
            paddingTop: "0vw"
          }}/>

        </div>
      </div>
      <div className="data-cards-container">
        {Object.keys(headerMapping).map((key) => (
          Object.keys(headerMapping[key]).map((subkey) => (
            <DataCard props={{
              header: subkey,
            insight_mapping: headerMapping[key],
            borderColor: colors[player.recent_team],
            player: player
            }}/>
          ))
        ))}

      </div>
    </div>
    </ProjectionProvider>
  );
}

PlayerCard.propTypes = {
  player: PropTypes.shape({
    headshot_url: PropTypes.string.isRequired,
    player_display_name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    recent_team: PropTypes.string.isRequired,
    fantasy_points_ppr: PropTypes.number,
    fantasy_points: PropTypes.number,
  }).isRequired,
};

export default PlayerCard;