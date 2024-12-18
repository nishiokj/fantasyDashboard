import React from 'react';
import { useParams } from 'react-router-dom';   
import { useState, useEffect } from 'react';

// Add interface for roster type
interface RosterData {
    [key: string]: string;  // Maps player IDs to player names
}

export const TeamPage = () => {
    const { leagueId, team, teamId } = useParams<{ leagueId: string; team: string; teamId: string }>();
    const [roster, setRoster] = useState<RosterData>({});

    const getRoster = async (teamId: string | undefined, leagueId: string | undefined): Promise<RosterData> => {
        const response = await fetch(`http://localhost:5001/fantasy/${leagueId}/roster/${teamId}`);
        const data = await response.json();
        return data;
    }

    useEffect(() => {
        const fetchRoster = async () => {
            const data = await getRoster(teamId, leagueId);
            setRoster(data);
        };
        fetchRoster();
    }, [teamId, leagueId]);

    return (
        <div className="fantasy-team-page">
            <header className="fantasy-team-header">
                <h1>{team}</h1>
            </header>
            <div className="fantasy-team-roster" >
                <ul>{Object.entries(roster).map(([playerId, playerName]) => (
                    <li style={{color: 'black', listStyleType: 'none'}} key={playerId}>{playerName}</li>
                ))}</ul>
            </div>  
        </div>
    )
}

export default TeamPage;