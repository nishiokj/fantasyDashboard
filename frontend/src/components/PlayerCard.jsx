import React from 'react';
import PropTypes from 'prop-types';
import DataCard from './DataCard';
import { headerMapping } from '../utils/headerMapping';
import { colors, teamMapping } from '../utils/teamMapping';
import '../PlayerCard.css';
import SportsFootballOutlinedIcon from '@mui/icons-material/SportsFootballOutlined';

export function PlayerCard({ player }) {
  return (
    <div
      className="player-card"
      style={{
        borderColor: colors[player.recent_team],
        backgroundColor: colors[player.recent_team],
        position: 'relative',
      }}
    >
      {/* Overlay Mask */}
      <div className="player-card-mask"></div>

      <div className="player-header">
        <img
          src={player.headshot_url}
          alt={`${player.player_display_name.toUpperCase()} Headshot`}
          style={{ borderColor: colors[player.recent_team] }}
        />
        <div className="player-info"> 
          <h2>{player.player_display_name.toUpperCase()}
            <div className="player-name-icon">
              <SportsFootballOutlinedIcon />
            </div>
          </h2>
        
          <div className="info-columns" >
            <h3>Pos</h3>
            <p className="info-column" style={{ borderColor: colors[player.recent_team] }}>{player.position}</p>
            <h3>PPG</h3>
            <p className="info-column" style={{ borderColor: colors[player.recent_team] }}>{player.fantasy_points_ppr.toFixed(1) || player.fantasy_points.toFixed(1) || 0}</p>
            <h3>Team</h3>
            <p className="info-column" style={{ borderColor: colors[player.recent_team] }}>{player.recent_team}</p>
          </div>
        </div>
      </div>
      <div className="data-cards-container">
        <DataCard props={{
          header: "Matchup",
          insight_mapping: headerMapping['Matchup'],
          borderColor: colors[player.recent_team],
          data: player
        }}/>
        <DataCard props={{
          header: "Season Insights",
          insight_mapping: headerMapping['Season Insights'],
          borderColor: colors[player.recent_team],
          data: player
        }}/>
        <DataCard props={{
          header: "Game Logs",
          insight_mapping: headerMapping['Game Logs'],
          borderColor: colors[player.recent_team],
          data: player
        }}/>

      </div>
    </div>
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