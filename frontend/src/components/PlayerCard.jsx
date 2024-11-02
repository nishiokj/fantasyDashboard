import React from 'react';
import PropTypes from 'prop-types';
import DataCard from './DataCard';
import { headerMapping } from '../utils/headerMapping';
import { colors } from '../utils/colors';
import '../PlayerCard.css';

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
        <h2>{player.player_display_name.toUpperCase()}</h2>
          <div className="info-columns" >
            <p className="info-column" style={{ borderColor: colors[player.recent_team] }}>{player.position}</p>
           
            <p className="info-column" style={{ borderColor: colors[player.recent_team] }}>{player.fantasy_points_ppr.toFixed(1) || player.fantasy_points.toFixed(1) || 0}</p>
            <p className="info-column" style={{ borderColor: colors[player.recent_team] }}>{player.recent_team}</p>
          </div>
        </div>
      </div>
      <div className="data-cards-container">
        <DataCard header="Matchup" insight_mapping={headerMapping['Matchup']} borderColor={colors[player.recent_team]} />
        <DataCard header="Season Insights" insight_mapping={headerMapping['Season Insights']} borderColor={colors[player.recent_team]} />
        <DataCard header="Game Logs" insight_mapping={headerMapping['Game Logs']} borderColor={colors[player.recent_team]} />
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