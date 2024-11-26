const express = require('express');
const router = express.Router();
const League = require('../models/League'); // Assuming you have a League model
const Team = require('../models/Team');
const LeagueService = require()


// Get league by ID
router.get('/:id', async (req, res) => {
    try {
        const league = await League.findById(req.params.id);
        if (!league) {
            return res.status(404).json({ message: 'League not found' });
        }
        res.status(200).json(league);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching league', error: error.message });
    }
});


module.exports = router;
