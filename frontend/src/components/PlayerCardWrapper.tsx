import { PlayerCard } from "./PlayerCard";
import { useLocation } from 'react-router-dom';
const PlayerCardWrapper = () => {
    const {state:playerData} = useLocation();
    if(!playerData){
      return <div>Player not found</div>
    }
    if (playerData){
      return <PlayerCard player={playerData} />
    }
    return null;
  }

  export default PlayerCardWrapper;