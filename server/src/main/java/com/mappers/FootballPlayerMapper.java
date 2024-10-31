package com.mappers;

import com.data.FootballPlayer;
import com.data.FootballPlayerImpl;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface FootballPlayerMapper {
    
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "firstName", column = "first_name"),
        @Result(property = "lastName", column = "last_name"),
        @Result(property = "team", column = "team"),
        @Result(property = "position", column = "position"),
        @Result(property = "nextMatchup", column = "next_matchup"),
        @Result(property = "opponent", column = "opponent"),
        @Result(property = "totalFantasyPoints", column = "total_fantasy_points"),
        @Result(property = "totalGamesPlayed", column = "total_games_played"),
        @Result(property = "positionRank", column = "position_rank"),
        @Result(property = "ppg", column = "ppg"),
        @Result(property = "projectedPoints", column = "projected_points"),
        @Result(property = "fantasyPoints", column = "fantasy_points"),
        @Result(property = "fantasyPointsPPR", column = "fantasy_points_ppr"),
        @Result(property = "targetShare", column = "target_share"),
        @Result(property = "receivingYards", column = "receiving_yards"),
        @Result(property = "receivingTouchdowns", column = "receiving_touchdowns"),
        @Result(property = "receptions", column = "receptions"),
        @Result(property = "receivingFumbles", column = "receiving_fumbles"),
        @Result(property = "receivingYardsAfterCatch", column = "receiving_yards_after_catch"),
        @Result(property = "passingYards", column = "passing_yards"),
        @Result(property = "passingTouchdowns", column = "passing_touchdowns"),
        @Result(property = "interceptions", column = "interceptions"),
        @Result(property = "rushingYards", column = "rushing_yards"),
        @Result(property = "rushingTouchdowns", column = "rushing_touchdowns"),
        @Result(property = "rushingFumbles", column = "rushing_fumbles"),
        @Result(property = "carries", column = "carries"),
        @Result(property = "extraPointsMade", column = "extra_points_made"),
        @Result(property = "extraPointsAttempted", column = "extra_points_attempted")
    })
    @Select("SELECT * FROM football_players WHERE id = #{id}")
    FootballPlayer getPlayerById(String id);
}
