package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import com.data.FootballPlayer;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import com.mappers.FootballPlayerFactory;
import jakarta.persistence.EntityNotFoundException;
import com.fasterxml.jackson.core.type.TypeReference;

@Service
public class FootballPlayerService {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    private ObjectMapper objectMapper = new ObjectMapper();

    public FootballPlayer getPlayer(String id) {
     
        String redisData = redisTemplate.opsForValue().get("player_stats:" + id);
       
        if (redisData == null) {
            throw new EntityNotFoundException("Player not found with id: " + id);
        }
        try {
            // Deserialize JSON string to Map<String, Object>
            Map<Object, Object> redisDataMap = objectMapper.readValue(
                redisData, 
                new TypeReference<Map<Object, Object>>() {}
            );

            // Optionally, log or process the map
            // System.out.println(redisDataMap);

            return FootballPlayerFactory.createFromRedis(redisDataMap);
        } catch (IOException e) {
            // Handle JSON parsing exceptions
            throw new RuntimeException("Error deserializing player data for id: " + id, e);
        }
    }

    // public List<FootballPlayer> getAllPlayers() {
    //     Set<String> keys = redisTemplate.keys("player_stats:*");
    //     return keys.stream()
    //         .map(key -> redisTemplate.opsForHash().entries(key))
    //         .map(FootballPlayerFactory::createFromRedis)
    //         .collect(Collectors.toList());
    // }

    // public List<FootballPlayer> getPlayersByTeam(String team) {
    //     return getAllPlayers().stream()
    //         .filter(player -> team.equals(player.getTeam()))
    //         .collect(Collectors.toList());
    // }
}
