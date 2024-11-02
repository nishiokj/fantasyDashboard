// Add event listener for search button click
document.getElementById('searchButton').addEventListener('click', searchPlayer);

// Add event listener for "Enter" key press in the search input
document.getElementById('playerSearch').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission if within a form
        searchPlayer();
    }
});

async function searchPlayer() {
    const playerName = document.getElementById('playerSearch').value;
    if (!playerName) return;

    try {
        const response = await fetch(`/player/${encodeURIComponent(playerName)}`);
        const data = await response.json();
        
        if (response.ok) {
            displayPlayerData(data);
        } else {
            document.getElementById('playerData').innerHTML = `
                <p class="error">Player not found</p>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('playerData').innerHTML = `
            <p class="error">Error fetching player data</p>
        `;
    }
}

function displayPlayerData(player) {
    const playerDiv = document.getElementById('playerData');
    let statsHTML = '';

    // Add header row based on position
    switch (player.position) {
        case 'QB':
            statsHTML += `
                <div class="stats-row header">
                    <div class="stat-column">Yards</div>
                    <div class="stat-column">TDs</div>
                    <div class="stat-column">Ints</div>
                    <div class="stat-column">RushYards</div>
                    <div class="stat-column">RushTDs</div>
                    <div class="stat-column">Pts</div>
                </div>
            `;
            statsHTML += `
                <div class="stats-row">
                    <div class="stat-column">${player.passing_yards || 0}</div>
                    <div class="stat-column">${player.passing_tds || 0}</div>
                    <div class="stat-column">${player.interceptions || 0}</div>
                    <div class="stat-column">${player.rushing_yards || 0}</div>
                    <div class="stat-column">${player.rushing_tds || 0}</div>
                    <div class="stat-column">${player.fantasy_points || 0}</div>
                </div>
            `;
            break;
        case 'RB':
            statsHTML += `
                <div class="stats-row header">
                    <div class="stat-column">Rushing Attempts</div>
                    <div class="stat-column">Rushing Yards</div>
                    <div class="stat-column">Rushing Touchdowns</div>
                    <div class="stat-column">Receptions</div>
                    <div class="stat-column">Receiving Yards</div>
                    <div class="stat-column">Receiving Touchdowns</div>
                    <div class="stat-column">Fantasy Points (PPR)</div>
                </div>
            `;
            statsHTML += `
                <div class="stats-row">
                    <div class="stat-column">${player.rushing_attempts || 0}</div>
                    <div class="stat-column">${player.rushing_yards || 0}</div>
                    <div class="stat-column">${player.rushing_tds || 0}</div>
                    <div class="stat-column">${player.receptions || 0}</div>
                    <div class="stat-column">${player.receiving_yards || 0}</div>
                    <div class="stat-column">${player.receiving_tds || 0}</div>
                    <div class="stat-column">${player.fantasy_points_ppr || 0}</div>
                </div>
            `;
            break;
        case 'WR':
            statsHTML += `
                <div class="stats-row header">
                    <div class="stat-column">rec</div>
                    <div class="stat-column">yards</div>
                    <div class="stat-column">tds</div>
                    <div class="stat-column">trgts</div>
                    <div class="stat-column">pts</div>
                </div>
            `;
            statsHTML += `
                <div class="stats-row">
                    <div class="stat-column">${player.receptions || 0}</div>
                    <div class="stat-column">${player.receiving_yards || 0}</div>
                    <div class="stat-column">${player.receiving_tds || 0}</div>
                    <div class="stat-column">${player.targets || 0}</div>
                    <div class="stat-column">${player.fantasy_points_ppr || 0}</div>
                </div>
            `;
            break;
        case 'TE':
            statsHTML += `
                <div class="stats-row header">
                    <div class="stat-column">rec</div>
                    <div class="stat-column">yards</div>
                    <div class="stat-column">tds</div>
                    <div class="stat-column">trgts</div>
                    <div class="stat-column">pts</div>
                </div>
            `;
            statsHTML += `
                <div class="stats-row">
                    <div class="stat-column">${player.receptions || 0}</div>
                    <div class="stat-column">${player.receiving_yards || 0}</div>
                    <div class="stat-column">${player.receiving_tds || 0}</div>
                    <div class="stat-column">${player.targets || 0}</div>
                    <div class="stat-column">${player.fantasy_points_ppr || 0}</div>
                </div>
            `;
            break;
        case 'K':
            statsHTML += `
                <div class="stats-row header">
                    <div class="stat-column">Field Goals Made</div>
                    <div class="stat-column">Field Goals Attempted</div>
                    <div class="stat-column">Extra Points Made</div>
                    <div class="stat-column">Fantasy Points</div>
                </div>
            `;
            statsHTML += `
                <div class="stats-row">
                    <div class="stat-column">${player.field_goals_made || 0}</div>
                    <div class="stat-column">${player.field_goals_attempted || 0}</div>
                    <div class="stat-column">${player.extra_points_made || 0}</div>
                    <div class="stat-column">${player.fantasy_points || 0}</div>
                </div>
            `;
            break;
        case 'DEF':
            statsHTML += `
                <div class="stats-row header">
                    <div class="stat-column">Points Allowed</div>
                    <div class="stat-column">Sacks</div>
                    <div class="stat-column">Interceptions</div>
                    <div class="stat-column">Fumbles Recovered</div>
                    <div class="stat-column">Defensive Touchdowns</div>
                    <div class="stat-column">Fantasy Points</div>
                </div>
            `;
            statsHTML += `
                <div class="stats-row">
                    <div class="stat-column">${player.points_allowed || 0}</div>
                    <div class="stat-column">${player.sacks || 0}</div>
                    <div class="stat-column">${player.interceptions || 0}</div>
                    <div class="stat-column">${player.fumbles_recovered || 0}</div>
                    <div class="stat-column">${player.defensive_tds || 0}</div>
                    <div class="stat-column">${player.fantasy_points || 0}</div>
                </div>
            `;
            break;
        default:
            statsHTML += `
                <div class="stats-row header">
                    <div class="stat-column">Receptions</div>
                    <div class="stat-column">Receiving Yards</div>
                    <div class="stat-column">Touchdowns</div>
                    <div class="stat-column">Targets</div>
                    <div class="stat-column">Fantasy Points (PPR)</div>
                </div>
            `;
            statsHTML += `
                <div class="stats-row">
                    <div class="stat-column">${player.receptions || 0}</div>
                    <div class="stat-column">${player.receiving_yards || 0}</div>
                    <div class="stat-column">${player.receiving_tds || 0}</div>
                    <div class="stat-column">${player.targets || 0}</div>
                    <div class="stat-column">${player.fantasy_points_ppr || 0}</div>
                </div>
            `;
    }

    playerDiv.innerHTML = `
        <div class="player-header">
            <img id="playerHeadshot" src="${player.headshot_url}" alt="${player.player_display_name} Headshot" onerror="this.src='static/images/default-headshot.png';" />
            <div class="player-info">
                <h2>${player.player_display_name}</h2>
                <p>Position: ${player.position}</p>
                <p>Team: ${player.recent_team}</p>
            </div>
        </div>
        <h3>Recent Stats</h3>
        ${statsHTML}
    `;
} 