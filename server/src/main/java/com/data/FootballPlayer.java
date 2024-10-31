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
    int getSeason();
    void setSeason(int season);
    
    int getWeek();
    void setWeek(int week);
    
    String getSeasonType();
    void setSeasonType(String seasonType);
    
    String getOpponentTeam();
    void setOpponentTeam(String opponentTeam);
    
    // Passing stats
    int getCompletions();
    void setCompletions(int completions);
    
    int getAttempts();
    void setAttempts(int attempts);
    
    double getSacks();
    void setSacks(double sacks);
    
    double getSackYards();
    void setSackYards(double sackYards);
    
    int getSackFumbles();
    void setSackFumbles(int sackFumbles);
    
    int getSackFumblesLost();
    void setSackFumblesLost(int sackFumblesLost);

    double getPassingYards();
    void setPassingYards(double passingYards);
    
    int getPassingTouchdowns();
    void setPassingTouchdowns(int passingTouchdowns);
    
    int getInterceptions();
    void setInterceptions(int interceptions);

    double getPassingYardsAfterCatch();
    void setPassingYardsAfterCatch(double passingYardsAfterCatch);
    
    double getPassingAirYards();
    void setPassingAirYards(double passingAirYards);
    
    int getPassingFirstDowns();
    void setPassingFirstDowns(int passingFirstDowns);
    
    double getPassingEpa();
    void setPassingEpa(double passingEpa);
    
    int getPassing2ptConversions();
    void setPassing2ptConversions(int passing2ptConversions);
    


    double getPacr();
    void setPacr(double pacr);
    
    double getDakota();
    void setDakota(double dakota);
    

    // Rushing stats
    int getCarries();
    void setCarries(int carries);
    
    int getRushingFirstDowns();
    void setRushingFirstDowns(int rushingFirstDowns);
    
    double getRushingEpa();
    void setRushingEpa(double rushingEpa);
    
    int getRushing2ptConversions();
    void setRushing2ptConversions(int rushing2ptConversions);
    
    int getRushingFumblesLost();
    void setRushingFumblesLost(int rushingFumblesLost);

    double getRushingYards();
    void setRushingYards(double rushingYards);

    int getRushingTouchdowns();
    void setRushingTouchdowns(int rushingTouchdowns);

    int getRushingFumbles();
    void setRushingFumbles(int rushingFumbles);

    int getReceptions();
    void setReceptions(int receptions);
    
    int getTargets();
    void setTargets(int targets);
    
    // Receiving stats
    double getTargetShare();
    void setTargetShare(double targetShare);
    
    int getReceivingFumbles();
    void setReceivingFumbles(int receivingFumbles);

    double getReceivingYards();
    void setReceivingYards(double receivingYards);

    double getReceivingYardsAfterCatch();
    void setReceivingYardsAfterCatch(double receivingYardsAfterCatch);

    int getReceivingTouchdowns();
    void setReceivingTouchdowns(int receivingTouchdowns);
    
    int getReceivingFumblesLost();
    void setReceivingFumblesLost(int receivingFumblesLost);
    
    double getReceivingAirYards();
    void setReceivingAirYards(double receivingAirYards);
    
    int getReceivingFirstDowns();
    void setReceivingFirstDowns(int receivingFirstDowns);
    
    double getReceivingEpa();
    void setReceivingEpa(double receivingEpa);
    
    int getReceiving2ptConversions();
    void setReceiving2ptConversions(int receiving2ptConversions);
    
    //Kicking stats
    int getExtraPointsMade();
    void setExtraPointsMade(int extraPointsMade);

    int getExtraPointsAttempted();
    void setExtraPointsAttempted(int extraPointsAttempted);

    // Advanced metrics
    double getRacr();
    void setRacr(double racr);
    
    double getAirYardsShare();
    void setAirYardsShare(double airYardsShare);
    
    double getWopr();
    void setWopr(double wopr);
    
    double getSpecialTeamsTds();
    void setSpecialTeamsTds(double specialTeamsTds);

    double getFantasyPoints();
    void setFantasyPoints(double fantasyPoints);

    double getFantasyPointsPPR();
    void setFantasyPointsPPR(double fantasyPointsPPR);
}
