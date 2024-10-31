package com.mappers;

import java.util.Map;
import com.data.FootballPlayerImpl;
import com.data.FootballPlayer;

public class FootballPlayerFactory {
    public static FootballPlayer createFromRedis(Map<Object, Object> redisData) {
        FootballPlayerImpl player = new FootballPlayerImpl();

        
        // Add new fields
        player.setPlayerId(getStringValue(redisData, "player_id"));
        player.setPlayerName(getStringValue(redisData, "player_name"));
        player.setPlayerDisplayName(getStringValue(redisData, "player_display_name"));
        player.setPositionGroup(getStringValue(redisData, "position_group"));
        player.setHeadshotUrl(getStringValue(redisData, "headshot_url"));
        player.setRecentTeam(getStringValue(redisData, "recent_team"));
        player.setSeason(getIntValue(redisData, "season"));
        player.setWeek(getIntValue(redisData, "week"));
        player.setSeasonType(getStringValue(redisData, "season_type"));
        player.setOpponentTeam(getStringValue(redisData, "opponent_team"));

        // Passing stats
        player.setCompletions(getIntValue(redisData, "completions"));
        player.setAttempts(getIntValue(redisData, "attempts"));
        player.setPassingYards(getDoubleValue(redisData, "passing_yards"));
        player.setPassingTouchdowns(getIntValue(redisData, "passing_tds"));
        player.setInterceptions(getIntValue(redisData, "interceptions"));
        player.setSacks(getDoubleValue(redisData, "sacks"));
        player.setSackYards(getDoubleValue(redisData, "sack_yards"));
        player.setSackFumbles(getIntValue(redisData, "sack_fumbles"));
        player.setSackFumblesLost(getIntValue(redisData, "sack_fumbles_lost"));
        player.setPassingAirYards(getDoubleValue(redisData, "passing_air_yards"));
        player.setPassingYardsAfterCatch(getDoubleValue(redisData, "passing_yards_after_catch"));
        player.setPassingFirstDowns(getIntValue(redisData, "passing_first_downs"));
        player.setPassingEpa(getDoubleValue(redisData, "passing_epa"));
        player.setPassing2ptConversions(getIntValue(redisData, "passing_2pt_conversions"));
        player.setPacr(getDoubleValue(redisData, "pacr"));
        player.setDakota(getDoubleValue(redisData, "dakota"));

        // Rushing stats
        player.setCarries(getIntValue(redisData, "carries"));
        player.setRushingYards(getDoubleValue(redisData, "rushing_yards"));
        player.setRushingTouchdowns(getIntValue(redisData, "rushing_tds"));
        player.setRushingFumbles(getIntValue(redisData, "rushing_fumbles"));
        player.setRushingFumblesLost(getIntValue(redisData, "rushing_fumbles_lost"));
        player.setRushingFirstDowns(getIntValue(redisData, "rushing_first_downs"));
        player.setRushingEpa(getDoubleValue(redisData, "rushing_epa"));
        player.setRushing2ptConversions(getIntValue(redisData, "rushing_2pt_conversions"));

        // Receiving stats
        player.setReceptions(getIntValue(redisData, "receptions"));
        player.setTargets(getIntValue(redisData, "targets"));
        player.setReceivingYards(getDoubleValue(redisData, "receiving_yards"));
        player.setReceivingTouchdowns(getIntValue(redisData, "receiving_tds"));
        player.setReceivingFumbles(getIntValue(redisData, "receiving_fumbles"));
        player.setReceivingFumblesLost(getIntValue(redisData, "receiving_fumbles_lost"));
        player.setReceivingAirYards(getDoubleValue(redisData, "receiving_air_yards"));
        player.setReceivingYardsAfterCatch(getDoubleValue(redisData, "receiving_yards_after_catch"));
        player.setReceivingFirstDowns(getIntValue(redisData, "receiving_first_downs"));
        player.setReceivingEpa(getDoubleValue(redisData, "receiving_epa"));
        player.setReceiving2ptConversions(getIntValue(redisData, "receiving_2pt_conversions"));

        // Advanced metrics
        player.setRacr(getDoubleValue(redisData, "racr"));
        player.setTargetShare(getDoubleValue(redisData, "target_share"));
        player.setAirYardsShare(getDoubleValue(redisData, "air_yards_share"));
        player.setWopr(getDoubleValue(redisData, "wopr"));
        player.setSpecialTeamsTds(getDoubleValue(redisData, "special_teams_tds"));
        player.setFantasyPoints(getDoubleValue(redisData, "fantasy_points"));
        player.setFantasyPointsPPR(getDoubleValue(redisData, "fantasy_points_ppr"));

        return player;
    }
    
    private static double parseDouble(String value) {
        try {
            return value != null ? Double.parseDouble(value) : 0.0;
        } catch (NumberFormatException e) {
            return 0.0;
        }
    }
    
    private static int parseInt(String value) {
        try {
            return value != null ? Integer.parseInt(value) : 0;
        } catch (NumberFormatException e) {
            return 0;
        }
    }
    
    private static String getStringValue(Map<Object, Object> data, String key) {
        Object value = data.get(key);
        return value != null ? value.toString() : null;
    }
    
    private static double getDoubleValue(Map<Object, Object> data, String key) {
        return parseDouble(getStringValue(data, key));
    }
    
    private static int getIntValue(Map<Object, Object> data, String key) {
        return parseInt(getStringValue(data, key));
    }
}
