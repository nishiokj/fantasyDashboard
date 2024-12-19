import '../TeamPage.css';
import {ProjectionContext} from './ProjectionContext';
import { useContext, useEffect, useState } from 'react';

interface PlayerRowProps {
    weekly: {
        player_display_name: string;
        position: string;
        recent_team: string;
        headshot_url: string;
    }
    projections: { [key: string]: number } | null;
}
interface StatValues {
    [key: string]: string | number;
}
export function PlayerRow({weekly, projections}: PlayerRowProps) {
    const [topRow, setTopRow] = useState<StatValues>({});
    const [bottomRow, setBottomRow] = useState<StatValues>({});

    useEffect(() => {
        if (!projections) {
            setTopRow({});
            setBottomRow({});
            return;
        }

        const entries = Object.entries(projections);
        const shortenedTitles: { [key: string]: string } = {
            "anytime_td": "TD",
            "anytime_yds": "YDS",
            "anytime_rec": "REC",
            "anytime_rush": "RUSH",
            "anytime_pass": "PASS"
        }
        const [newTopRow, newBottomRow] = entries.reduce<[StatValues, StatValues]>(
            (acc,[stat, projection], index) => {
                const shortenedStat = shortenedTitles[stat] || stat;
                let projectionValue: string | number = projection;
                if(stat === "anytime_td" && projection > 0) {
                    projectionValue = `+${projection}`;
                }
                acc[index <= 2 ? 0 : 1][shortenedStat] = projectionValue;
                return acc;
            }, [{}, {}]);
        setTopRow(newTopRow);
        setBottomRow(newBottomRow);
    }, [projections]);

    return (
        <div className="player-row-stats">
            <div className="headshot">
                <img src={weekly.headshot_url} alt={weekly.player_display_name} />
            </div>
            <div className="stat-cells-container">
                {Object.entries(topRow).map(([key,value])=>(
                    <div key={key} className="player-cell"> 
                        <div className="player-cell-header-text">{key}</div>
                        <div className="player-cell-text">{value}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlayerRow;
