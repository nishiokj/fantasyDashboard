package com.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.data.FootballPlayer;
import com.data.Player;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import com.service.FootballPlayerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@RestController
@RequestMapping("/api")
class PlayerController {
    private final FootballPlayerService footballPlayerService;
    private static final Logger logger = LoggerFactory.getLogger(PlayerController.class);
    public PlayerController(FootballPlayerService footballPlayerService) {
        this.footballPlayerService = footballPlayerService;
    }

    @GetMapping("/player/{playerName}")
    public FootballPlayer getPlayer(@PathVariable String playerName) {
        logger.info("Searching for player: {}", playerName);
        String decodedName = URLDecoder.decode(playerName, StandardCharsets.UTF_8);
        return footballPlayerService.getPlayer(decodedName);
    }

    @GetMapping("/players")
    public List<FootballPlayer> getAllPlayers() {
        return footballPlayerService.getAllPlayers();
    }

    // Uncomment when you're ready to implement team filtering
    // @GetMapping("/team/{team}")
    // public List<FootballPlayer> getPlayersByTeam(@PathVariable String team) {
    //     return footballPlayerService.getPlayersByTeam(team);
    // }
}