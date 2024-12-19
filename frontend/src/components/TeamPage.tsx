import React from 'react';
import { useParams } from 'react-router-dom';   
import { useState, useEffect } from 'react';
import { colors } from '../utils/teamMapping';
import { Link } from 'react-router-dom';
import StatBar from './StatBar';
import '../TeamPage.css';
import { PlayerRow } from './PlayerRow';


interface PlayerData {
    weekly: {
      headshot_url: string;
      player_display_name: string;
      position: string;
      recent_team: keyof typeof colors;
      fantasy_points_ppr: number;
      fantasy_points: number;
      attempts: number;
      completions: number;
      passing_yards: number;
      passing_tds: number;
      interceptions: number;
      rushing_yards: number;
      rushing_tds: number;
      receptions: number;
      receiving_yards: number;
      receiving_tds: number;
    };
    season: {
      fantasy_points_ppr: number;
      fantasy_points: number;
      games: number;
      receptions: number;
        };
    }

interface ProjectionData {
    projections: {
        [key: string]: number;
       };
}
// Add interface for roster type
interface RosterData {
    [key: string]: {
        player_data: PlayerData;
        player_projection: ProjectionData;
    };  // Maps player IDs to player data
}

export const TeamPage = () => {
    const { leagueId, team, teamId } = useParams<{ leagueId: string; team: string; teamId: string }>();
    const [roster, setRoster] = useState<RosterData>({});
    const [loading, setLoading] = useState(true);
    const getRoster = async (teamId: string | undefined, leagueId: string | undefined): Promise<RosterData> => {
        const response = await fetch(`http://localhost:5001/fantasy/${leagueId}/roster/${teamId}`)
        const data = await response.json();
        return data;
    }

    useEffect(() => {
        const fetchRoster = async () => {
          try {
            const data = await getRoster(teamId, leagueId);
            setRoster(data);
            setLoading(false);
            console.log(data);
          } catch (error) {
            console.error('Error fetching roster:', error);
          }
        };
        fetchRoster();
      }, [teamId, leagueId]);
      
    

    return (
        
        <div className="fantasy-team-page">
            <header className="fantasy-team-header">
                <h1>{team}</h1>
            </header>
            <div className="fantasy-team-roster" >
                {loading ? <p>Loading...</p> : (
                <ul>{Object.entries(roster).map(([playerId, data]) => {
                    // Debug logs
                    console.log('---Player Debug---');
                    console.log('Player:', data.player_data.weekly.player_display_name);
                    console.log('Full data:', data);
                    console.log('player_projection:', data.player_projection);
                    if (data.player_projection === null) {
                        console.log('Found null projection for:', data.player_data.weekly.player_display_name);
                    }
                    
                    return (
                        
                        <div style={{color: 'black', listStyleType: 'none'}} key={playerId} className="player-row">
                             
                            <img src={data.player_data.weekly.headshot_url} alt={data.player_data.weekly.player_display_name} className="headshot" />
                            <Link to={`/player/${playerId}`} state={data.player_data}>   
                                <div className="link">
                                    {data.player_data.weekly.player_display_name}</div>
                            </Link>
                            <PlayerRow 
                                weekly={data.player_data.weekly} 
                                projections={data.player_projection === null ? null : data.player_projection.projections} 
                            />
                           
                        </div>
                    );
                })}
            </ul>
            )}
            </div>  
        </div>
    )
}

export default TeamPage;