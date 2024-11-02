import React from 'react';
import { getStatsConfig } from '../utils/statsConfig';

export function SeasonStats({ player }) {
  const statsConfig = getStatsConfig(player.position);
  
  return (
    <div className="season-stats">
      <h3>Season Stats</h3>
      <div className="stats-grid">
        <div className="stats-row header">
          {statsConfig.map((stat) => (
            <div key={stat.key} className="stat-column">
              {stat.label}
            </div>
          ))}
        </div>
        <div className="stats-row">
          {statsConfig.map((stat) => (
            <div key={stat.key} className="stat-column">
              {player[stat.key] || 0}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 