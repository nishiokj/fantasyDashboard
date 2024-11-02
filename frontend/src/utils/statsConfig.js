export const getStatsConfig = (position) => {
  switch (position) {
    case 'QB':
      return [
        { key: 'passing_yards', label: 'Yards' },
        { key: 'passing_tds', label: 'TDs' },
        { key: 'interceptions', label: 'Ints' },
        { key: 'rushing_yards', label: 'Rush Yds' },
        { key: 'rushing_tds', label: 'Rush TDs' },
        { key: 'fantasy_points', label: 'Pts' }
      ];
    case 'RB':
      return [
        { key: 'rushing_attempts', label: 'Att' },
        { key: 'rushing_yards', label: 'Rush Yds' },
        { key: 'rushing_tds', label: 'Rush TDs' },
        { key: 'receptions', label: 'Rec' },
        { key: 'receiving_yards', label: 'Rec Yds' },
        { key: 'receiving_tds', label: 'Rec TDs' },
        { key: 'fantasy_points_ppr', label: 'PPR Pts' }
      ];
    default:
      return [
        { key: 'receptions', label: 'Rec' },
        { key: 'receiving_yards', label: 'Yards' },
        { key: 'receiving_tds', label: 'TDs' },
        { key: 'targets', label: 'Trgts' },
        { key: 'fantasy_points_ppr', label: 'PPR Pts' }
      ];
  }
}; 