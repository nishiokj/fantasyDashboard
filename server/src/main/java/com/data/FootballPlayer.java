package com.data;

import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS)
public interface FootballPlayer extends Player {
    
    // Player identification
    String getPlayerId();
    void setPlayerId(String playerId);
    
    String getPlayerName();
    void setPlayerName(String playerName);
    
    String getPlayerDisplayName();
    void setPlayerDisplayName(String playerDisplayName);
    
    String getPositionGroup();
    void setPositionGroup(String positionGroup);
    
    String getHeadshotUrl();
    void setHeadshotUrl(String headshotUrl);
    
    String getRecentTeam();
    void setRecentTeam(String recentTeam);
    
    // Game info
    Integer getSeason();
    void setSeason(Integer season);
    
    Integer getWeek();
    void setWeek(Integer week);
    
    String getSeasonType();
    void setSeasonType(String seasonType);
    
    String getOpponentTeam();
    void setOpponentTeam(String opponentTeam);
    
    // Passing stats
    Integer getCompletions();
    void setCompletions(Integer completions);
    
    Integer getAttempts();
    void setAttempts(Integer attempts);
    
    Double getSacks();
    void setSacks(Double sacks);
    
    Double getSackYards();
    void setSackYards(Double sackYards);
    
    Integer getSackFumbles();
    void setSackFumbles(Integer sackFumbles);
    
    Integer getSackFumblesLost();
    void setSackFumblesLost(Integer sackFumblesLost);

    Double getPassingYards();
    void setPassingYards(Double passingYards);
    
    Integer getPassingTouchdowns();
    void setPassingTouchdowns(Integer passingTouchdowns);
    
    Integer getInterceptions();
    void setInterceptions(Integer interceptions);

    Double getPassingYardsAfterCatch();
    void setPassingYardsAfterCatch(Double passingYardsAfterCatch);
    
    Double getPassingAirYards();
    void setPassingAirYards(Double passingAirYards);
    
    Integer getPassingFirstDowns();
    void setPassingFirstDowns(Integer passingFirstDowns);
    
    Double getPassingEpa();
    void setPassingEpa(Double passingEpa);
    
    Integer getPassing2ptConversions();
    void setPassing2ptConversions(Integer passing2ptConversions);
    


    Double getPacr();
    void setPacr(Double pacr);
    
    Double getDakota();
    void setDakota(Double dakota);
    

    // Rushing stats
    Integer getCarries();
    void setCarries(Integer carries);
    
    Integer getRushingFirstDowns();
    void setRushingFirstDowns(Integer rushingFirstDowns);
    
    Double getRushingEpa();
    void setRushingEpa(Double rushingEpa);
    
    Integer getRushing2ptConversions();
    void setRushing2ptConversions(Integer rushing2ptConversions);
    
    Integer getRushingFumblesLost();
    void setRushingFumblesLost(Integer rushingFumblesLost);

    Double getRushingYards();
    void setRushingYards(Double rushingYards);

    Integer getRushingTouchdowns();
    void setRushingTouchdowns(Integer rushingTouchdowns);

    Integer getRushingFumbles();
    void setRushingFumbles(Integer rushingFumbles);

    Integer getReceptions();
    void setReceptions(Integer receptions);
    
    Integer getTargets();
    void setTargets(Integer targets);
    
    // Receiving stats
    Double getTargetShare();
    void setTargetShare(Double targetShare);
    
    Integer getReceivingFumbles();
    void setReceivingFumbles(Integer receivingFumbles);

    Double getReceivingYards();
    void setReceivingYards(Double receivingYards);

    Double getReceivingYardsAfterCatch();
    void setReceivingYardsAfterCatch(Double receivingYardsAfterCatch);

    Integer getReceivingTouchdowns();
    void setReceivingTouchdowns(Integer receivingTouchdowns);
    
    Integer getReceivingFumblesLost();
    void setReceivingFumblesLost(Integer receivingFumblesLost);
    
    Double getReceivingAirYards();
    void setReceivingAirYards(Double receivingAirYards);
    
    Integer getReceivingFirstDowns();
    void setReceivingFirstDowns(Integer receivingFirstDowns);
    
    Double getReceivingEpa();
    void setReceivingEpa(Double receivingEpa);
    
    Integer getReceiving2ptConversions();
    void setReceiving2ptConversions(Integer receiving2ptConversions);
    
    //Kicking stats
    Integer getExtraPointsMade();
    void setExtraPointsMade(Integer extraPointsMade);

    Integer getExtraPointsAttempted();
    void setExtraPointsAttempted(Integer extraPointsAttempted);

    // Advanced metrics
    Double getRacr();
    void setRacr(Double racr);
    
    Double getAirYardsShare();
    void setAirYardsShare(Double airYardsShare);
    
    Double getWopr();
    void setWopr(Double wopr);
    
    Double getSpecialTeamsTds();
    void setSpecialTeamsTds(Double specialTeamsTds);

    Double getFantasyPoints();
    void setFantasyPoints(Double fantasyPoints);

    Double getFantasyPointsPPR();
    void setFantasyPointsPPR(Double fantasyPointsPPR);
}
