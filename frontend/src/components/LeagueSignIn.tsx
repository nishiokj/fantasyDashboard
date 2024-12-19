import React, { useState } from 'react';
import DataCard from './DataCard';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { TeamPage } from './TeamPage';
import { Link } from 'react-router-dom';

const StyledSignin = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50vh',
  backgroundColor: 'white',
  gap: '1vw',
}));
const StyledTeams = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50vh',
  backgroundColor: 'white',
}));
const LeagueSignIn = () => {
  const [leagueId, setLeagueId] = useState('');
  const [loading, setLoading] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [teams, setTeams] = useState<Record<string, string>>({});
  const searchLeague = (leagueId: string) => {
    setLoading(true);
    setLeagueId(leagueId);
    axios.get(`http://localhost:5001/fantasy/${leagueId}`)
      .then(response => {
        console.log(response);
        setLoading(false);
        if (response.status === 200) {
          setSignedIn(true);
          setTeams(response.data);
          
        }
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }

  return (
    <>
    {!signedIn && (
    <StyledSignin>
        <>
          <input 
            type="text" 
            placeholder="Enter ESPN League ID" 
            onChange={(e) => setLeagueId(e.target.value)}
          />
          {loading ? (
            <CircularProgress />
          ) : (
            <button onClick={() => searchLeague(leagueId)}>
              Sign In
            </button>
          )}
        </>
      </StyledSignin>
    )}
    <StyledTeams>
        <ul style={{color: 'black'}}>
            {signedIn && Object.entries(teams).map(([teamId, team]) => (
                <li key={teamId}>
                    <Link to={`/team/${leagueId}/${team}/${teamId}`} style={{textDecoration: 'none'}}>
                        {team} 
                    </Link>
                </li>
            ))}
        </ul>
    </StyledTeams>
    </>
  );
};

export default LeagueSignIn;