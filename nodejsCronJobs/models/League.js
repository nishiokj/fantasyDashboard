const ESPN = require('espn-fantasy-football-api/node');

class League {
  static async findById(leagueId) {
    try {
      const currentYear = new Date().getFullYear();
      console.log('Fetching public league:', parseInt(leagueId, 10));
      
      // Create ESPN API client
      const client = new ESPN.Client({ 
        leagueId: parseInt(leagueId, 10) 
      });

      // Add error handling for invalid league ID
      if (!client.leagueId) {
        throw new Error('Invalid league ID');
      }

      // Set cookies (these might need to be updated)
      client.setCookies({
        espnS2: 'AEAjvsBxPW%2BnvDa60eQMazp4IZivh5dSXnkpL5VGRVSFIiz9wo1rqgZyLlbEDY9kELljJRk7V%2BI6yJdCA7HYmxlbgwg%2FnOGVGUI5%2FjyNoU2v%2FT79xJoKA4mfaxJ0upQB6fA%2FsDehcwAnjFS%2FT45c9lurZqHZudRF1%2BQX2fshlLaN1raZJwnCN2S1PL6vkIYR4dYpTknBRadYDFWzodvBh2B8cKNPkgqGSzjre7NNXQM7X0krv0QHVtTcDjNiHfv7fowg0gjkcFvE3UfSJyxMuqFs2yEXATvKMzuTE97OFLBpsQ%3D%3D',
        SWID: '{341DFF6A-A0AD-44C4-99D4-9AA45D126AF8}'
      });

      // Try both current and historical endpoints
      try {
        console.log('Attempting to fetch current season data...');
        const [leagueInfo, teamsInfo] = await Promise.all([
          client.getLeagueInfo({ seasonId: currentYear }),
          client.getTeamsAtWeek({ seasonId: currentYear, scoringPeriodId: 1 })
        ]);

        if (leagueInfo || teamsInfo?.length) {
          return {
            leagueInfo,
            teams: teamsInfo || []
          };
        }

        // If current season fails, try historical endpoint
        console.log('Current season not found, trying historical endpoint...');
        const historicalData = await client.getHistoricalScoreboardForWeek({
          seasonId: currentYear,
          matchupPeriodId: 1,
          scoringPeriodId: 1
        });

        if (historicalData) {
          return {
            leagueInfo: { isHistorical: true },
            teams: historicalData
          };
        }
      } catch (innerError) {
        console.error('Error fetching league data:', innerError);
      }

      // If we get here, no data was found
      console.log('No league data found');
      return null;

    } catch (error) {
      console.error('Error in findById:', {
        message: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      throw new Error(`Failed to fetch league: ${error.message}`);
    }
  }
}

module.exports = League;

