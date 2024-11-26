import { Client } from 'espn-fantasy-football-api';

class League {
  static async findById(leagueId, seasonId) {
    try {
      const client = new Client({ leagueId });
      const league = await client.getLeagueInfo({ seasonId });
      return league;
    } catch (error) {
      throw new Error(`Failed to fetch league: ${error.message}`);
    }
  }
}

export default League;


