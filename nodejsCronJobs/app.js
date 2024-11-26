const leagueRoutes = require('./controllers/leagueController');
app.use('/api/leagues', leagueRoutes);
const teamRoutes = require('/controllers/teamController');
app.use('/api/teams');

  