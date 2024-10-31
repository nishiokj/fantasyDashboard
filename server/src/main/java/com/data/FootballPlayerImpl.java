package com.data;

import java.util.Map;

public class FootballPlayerImpl implements FootballPlayer {
    
// New player identification fields
    private String playerId;
    private String playerName;
    private String playerDisplayName;
    private String positionGroup;
    private String headshotUrl;
    private String recentTeam;

    // Game info fields
    private Integer season;
    private Integer week;
    private String seasonType;
    private String opponentTeam;

    // Passing stats
    private Integer completions;
    private Integer attempts;
    private Double sacks;
    private Double sackYards;
    private Integer sackFumbles;
    private Integer sackFumblesLost;
    private Double passingAirYards;
    private Integer passingFirstDowns;
    private Double passingYards;
    private Integer passingTouchdowns;
    private Double passingYardsAfterCatch;
    private Integer interceptions;
    private Double passingEpa;
    private Integer passing2ptConversions;
    private Double pacr;
    private Double dakota;

    // Rushing stats
    private Integer carries;
    private Double rushingYards;
    private Integer rushingTouchdowns;
    private Integer rushingFumbles;
    private Integer rushingFirstDowns;
    private Double rushingEpa;
    private Integer rushing2ptConversions;
    private Integer rushingFumblesLost;
    
    // Receiving stats
    private Integer receptions;
    private Integer receivingFumbles;
    private Integer targets;
    private Integer receivingFumblesLost;
    private Double receivingYards;
    private Double receivingAirYards;
    private Integer receivingTouchdowns;
    private Integer receivingFirstDowns;
    private Double receivingEpa;
    private Integer receiving2ptConversions;
    private Double receivingYardsAfterCatch;

    //Kicking stats
    private Integer extraPointsMade;
    private Integer extraPointsAttempted;

    // Advanced metrics
    private Double targetShare;
    private Double racr;
    private Double airYardsShare;
    private Double wopr;
    private Double specialTeamsTds;
    private Double fantasyPointsPPR;
    private Double fantasyPoints;


    @Override
    public String getSport() { return "Football"; }


    @Override
    public String getTeam() { return recentTeam; }

    @Override
    public String getFirstName() { return playerName; }

    @Override
    public String getLastName() { return playerName; }
       


    

    // Getters and setters
    @Override
    public String getPlayerId() { return playerId; }
    @Override
    public void setPlayerId(String playerId) { this.playerId = playerId; }

    @Override
    public String getPlayerName() { return playerName; }
    @Override
    public void setPlayerName(String playerName) { this.playerName = playerName; }


    @Override
    public Integer getReceptions() { return receptions; }
    @Override
    public void setReceptions(Integer receptions) { this.receptions = receptions; }

    @Override
    public Double getReceivingYards() { return receivingYards; }
    @Override
    public void setReceivingYards(Double receivingYards) { this.receivingYards = receivingYards; }

    @Override
    public Integer getTargets() { return targets; }
    @Override
    public void setTargets(Integer targets) { this.targets = targets; }

    @Override
    public Integer getReceivingFumbles() { return receivingFumbles; }
    @Override
    public void setReceivingFumbles(Integer receivingFumbles) { this.receivingFumbles = receivingFumbles; }

    @Override
    public Double getFantasyPointsPPR() { return fantasyPointsPPR; }
    @Override
    public void setFantasyPointsPPR(Double fantasyPointsPPR) { this.fantasyPointsPPR = fantasyPointsPPR; }

    @Override
    public Double getReceivingYardsAfterCatch() { return receivingYardsAfterCatch; }
    @Override
    public void setReceivingYardsAfterCatch(Double receivingYardsAfterCatch) { this.receivingYardsAfterCatch = receivingYardsAfterCatch; }

    @Override
    public Double getPassingYards() { return passingYards; }
    @Override
    public void setPassingYards(Double passingYards) { this.passingYards = passingYards; }

    @Override
    public Integer getPassingTouchdowns() { return passingTouchdowns; }
    @Override
    public void setPassingTouchdowns(Integer passingTouchdowns) { this.passingTouchdowns = passingTouchdowns; }

    @Override
    public Double getPassingYardsAfterCatch() { return passingYardsAfterCatch; }
    @Override
    public void setPassingYardsAfterCatch(Double passingYardsAfterCatch) { this.passingYardsAfterCatch = passingYardsAfterCatch; }

    @Override
    public Integer getInterceptions() { return interceptions; }
    @Override
    public void setInterceptions(Integer interceptions) { this.interceptions = interceptions; }

    @Override
    public Double getRushingYards() { return rushingYards; }
    @Override
    public void setRushingYards(Double rushingYards) { this.rushingYards = rushingYards; }

    @Override
    public Integer getRushingTouchdowns() { return rushingTouchdowns; }
    @Override
    public void setRushingTouchdowns(Integer rushingTouchdowns) { this.rushingTouchdowns = rushingTouchdowns; }

    @Override
    public Integer getRushingFumbles() { return rushingFumbles; }
    @Override
    public void setRushingFumbles(Integer rushingFumbles) { this.rushingFumbles = rushingFumbles; }

    @Override
    public Integer getCarries() { return carries; }
    @Override
    public void setCarries(Integer carries) { this.carries = carries; }

    @Override
    public Integer getExtraPointsMade() { return extraPointsMade; }
    @Override
    public void setExtraPointsMade(Integer extraPointsMade) { this.extraPointsMade = extraPointsMade; }

    @Override
    public Integer getExtraPointsAttempted() { return extraPointsAttempted; }
    @Override
    public void setExtraPointsAttempted(Integer extraPointsAttempted) { this.extraPointsAttempted = extraPointsAttempted; }

  
    @Override
    public Double getWopr() { return wopr; }
    @Override
    public void setWopr(Double wopr) { this.wopr = wopr; }

    @Override
    public Double getSpecialTeamsTds() { return specialTeamsTds; }
    @Override
    public void setSpecialTeamsTds(Double specialTeamsTds) { this.specialTeamsTds = specialTeamsTds; }

    @Override
    public String getPlayerDisplayName() { return playerDisplayName; }
    @Override
    public void setPlayerDisplayName(String playerDisplayName) { this.playerDisplayName = playerDisplayName; }

    @Override
    public String getPositionGroup() { return positionGroup; }
    @Override
    public void setPositionGroup(String positionGroup) { this.positionGroup = positionGroup; }

    @Override
    public String getHeadshotUrl() { return headshotUrl; }
    @Override
    public void setHeadshotUrl(String headshotUrl) { this.headshotUrl = headshotUrl; }

    @Override
    public String getRecentTeam() { return recentTeam; }
    @Override
    public void setRecentTeam(String recentTeam) { this.recentTeam = recentTeam; }

    @Override
    public Integer getSeason() { return season; }
    @Override
    public void setSeason(Integer season) { this.season = season; }

    @Override
    public Integer getWeek() { return week; }
    @Override
    public void setWeek(Integer week) { this.week = week; }

    @Override
    public String getSeasonType() { return seasonType; }
    @Override
    public void setSeasonType(String seasonType) { this.seasonType = seasonType; }

    @Override
    public String getOpponentTeam() { return opponentTeam; }
    @Override
    public void setOpponentTeam(String opponentTeam) { this.opponentTeam = opponentTeam; }

    @Override
    public Integer getCompletions() { return completions; }
    @Override
    public void setCompletions(Integer completions) { this.completions = completions; }

    @Override
    public Integer getAttempts() { return attempts; }
    @Override
    public void setAttempts(Integer attempts) { this.attempts = attempts; }

    @Override
    public Double getSacks() { return sacks; }
    @Override
    public void setSacks(Double sacks) { this.sacks = sacks; }

    @Override
    public Double getSackYards() { return sackYards; }
    @Override
    public void setSackYards(Double sackYards) { this.sackYards = sackYards; }

    @Override
    public Integer getSackFumbles() { return sackFumbles; }
    @Override
    public void setSackFumbles(Integer sackFumbles) { this.sackFumbles = sackFumbles; }

    @Override
    public Integer getSackFumblesLost() { return sackFumblesLost; }
    @Override
    public void setSackFumblesLost(Integer sackFumblesLost) { this.sackFumblesLost = sackFumblesLost; }

    @Override
    public Double getPassingAirYards() { return passingAirYards; }
    @Override
    public void setPassingAirYards(Double passingAirYards) { this.passingAirYards = passingAirYards; }

    @Override
    public Integer getPassingFirstDowns() { return passingFirstDowns; }
    @Override
    public void setPassingFirstDowns(Integer passingFirstDowns) { this.passingFirstDowns = passingFirstDowns; }

    @Override
    public Double getPassingEpa() { return passingEpa; }
    @Override
    public void setPassingEpa(Double passingEpa) { this.passingEpa = passingEpa; }

    @Override
    public Integer getPassing2ptConversions() { return passing2ptConversions; }
    @Override
    public void setPassing2ptConversions(Integer passing2ptConversions) { this.passing2ptConversions = passing2ptConversions; }

    @Override
    public Double getPacr() { return pacr; }
    @Override
    public void setPacr(Double pacr) { this.pacr = pacr; }

    @Override
    public Double getDakota() { return dakota; }
    @Override
    public void setDakota(Double dakota) { this.dakota = dakota; }

    @Override
    public Integer getRushingFirstDowns() { return rushingFirstDowns; }
    @Override
    public void setRushingFirstDowns(Integer rushingFirstDowns) { this.rushingFirstDowns = rushingFirstDowns; }

    @Override
    public Double getRushingEpa() { return rushingEpa; }
    @Override
    public void setRushingEpa(Double rushingEpa) { this.rushingEpa = rushingEpa; }

    @Override
    public Integer getRushing2ptConversions() { return rushing2ptConversions; }
    @Override
    public void setRushing2ptConversions(Integer rushing2ptConversions) { this.rushing2ptConversions = rushing2ptConversions; }

    @Override
    public Integer getRushingFumblesLost() { return rushingFumblesLost; }
    @Override
    public void setRushingFumblesLost(Integer rushingFumblesLost) { this.rushingFumblesLost = rushingFumblesLost; }

    @Override
    public Double getTargetShare() { return targetShare; }
    @Override
    public void setTargetShare(Double targetShare) { this.targetShare = targetShare; }

    @Override
    public Integer getReceivingFumblesLost() { return receivingFumblesLost; }
    @Override
    public void setReceivingFumblesLost(Integer receivingFumblesLost) { this.receivingFumblesLost = receivingFumblesLost; }

    @Override
    public Double getReceivingAirYards() { return receivingAirYards; }
    @Override
    public void setReceivingAirYards(Double receivingAirYards) { this.receivingAirYards = receivingAirYards; }

    @Override
    public Integer getReceivingTouchdowns() { return receivingTouchdowns; }
    @Override
    public void setReceivingTouchdowns(Integer receivingTouchdowns) { this.receivingTouchdowns = receivingTouchdowns; }

    @Override
    public Integer getReceivingFirstDowns() { return receivingFirstDowns; }
    @Override
    public void setReceivingFirstDowns(Integer receivingFirstDowns) { this.receivingFirstDowns = receivingFirstDowns; }

    @Override
    public Double getReceivingEpa() { return receivingEpa; }
    @Override
    public void setReceivingEpa(Double receivingEpa) { this.receivingEpa = receivingEpa; }

    @Override
    public Integer getReceiving2ptConversions() { return receiving2ptConversions; }
    @Override
    public void setReceiving2ptConversions(Integer receiving2ptConversions) { this.receiving2ptConversions = receiving2ptConversions; }

    @Override
    public Double getRacr() { return racr; }
    @Override
    public void setRacr(Double racr) { this.racr = racr; }

    @Override
    public Double getAirYardsShare() { return airYardsShare; }
    @Override
    public void setAirYardsShare(Double airYardsShare) { this.airYardsShare = airYardsShare; }

    @Override
    public Double getFantasyPoints() { return fantasyPoints; }
    @Override
    public void setFantasyPoints(Double fantasyPoints) { this.fantasyPoints = fantasyPoints; }

}