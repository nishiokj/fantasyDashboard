const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
const leagueRoutes = require('./controllers/leagueController');
app.use('/api/leagues', leagueRoutes);
const teamRoutes = require('./controllers/teamController');
app.use('/api/teams', teamRoutes);

// Port setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

  