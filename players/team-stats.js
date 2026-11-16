const careerTeamRecords = {
  PSL1: {
    BADiles: [9, 7, 1, 1],
    "Oi Thryloi": [7, 4, 0, 3],
    AXR: [8, 4, 0, 4],
    Nikolado: [7, 1, 0, 6],
    Taximi: [7, 0, 0, 7],
    Clippers: [7, 3, 1, 3],
    Temachio: [8, 4, 0, 4],
    R1: [9, 7, 0, 2]
  },
  PSL2: {
    AXR: [6, 5, 0, 1],
    Nikolado: [3, 1, 0, 2],
    Nanoi: [3, 0, 0, 3],
    Melpon: [4, 2, 0, 2],
    R1: [4, 3, 0, 1],
    Warriors: [3, 0, 0, 3],
    Taximi: [6, 4, 0, 2],
    Kalyma: [3, 1, 0, 2],
    Brazil: [6, 6, 0, 0],
    "Spasmena Mila": [3, 1, 0, 2],
    Mpesala: [6, 3, 0, 3],
    Karronios: [3, 0, 0, 3],
    Temachio: [4, 3, 0, 1],
    Koseveikos: [3, 0, 0, 3],
    Maralers: [4, 2, 0, 2],
    "S Tiers": [3, 1, 0, 2]
  },
  PSL3: {
    BADiles: [18, 16, 0, 2],
    R1: [15, 11, 0, 4],
    Clippers: [20, 15, 0, 5],
    AXR: [17, 11, 0, 6],
    Axtarmades: [15, 3, 0, 12],
    "Spasmena Mila": [16, 9, 0, 7],
    Trixes: [14, 3, 0, 11],
    Russia: [20, 15, 0, 5],
    "Skiouroi PC": [14, 3, 0, 11],
    MAKFI: [17, 8, 0, 9],
    Aetoi: [14, 2, 0, 12],
    Brazil: [16, 9, 0, 7],
    NFFC: [15, 2, 0, 13],
    "Didymoi Pyrgoi": [15, 7, 0, 8],
    EEE: [1, 0, 0, 1],
    Pagkavliakos: [1, 0, 0, 1]
  },
  PSL4: {
    R1: [20, 13, 1, 6],
    Mpesala: [19, 9, 0, 10],
    "Basement Boys": [21, 11, 0, 10],
    Russia: [23, 19, 0, 4],
    "Y&Y": [18, 6, 0, 12],
    AXR: [24, 19, 1, 4],
    Fintani: [21, 11, 0, 10],
    Nanoi: [21, 10, 0, 11],
    "Midi Kidz": [18, 1, 0, 17],
    "Shadow Wizard Money Gang": [19, 2, 0, 17],
    "Didymoi Pyrgoi": [19, 9, 0, 10],
    MAKFI: [19, 10, 0, 9],
    Warriors: [18, 2, 0, 16],
    Axtarmades: [18, 3, 0, 15],
    BADiles: [21, 16, 0, 5],
    Kleftes: [21, 20, 0, 1],
    "Spasmena Mila": [18, 8, 0, 10],
    NFFC: [20, 9, 0, 11]
  },
  PSL5: {
    "Spasmena Mila": [18, 10, 0, 8],
    "Y&Y": [19, 17, 0, 2],
    "Midi Kidz": [16, 6, 0, 10],
    "Basement Boys": [20, 14, 0, 6],
    Babiniotes: [16, 5, 0, 11],
    BADiles: [20, 19, 0, 1],
    Warriors: [15, 5, 1, 9],
    Phoenix: [15, 4, 0, 11],
    R1: [19, 12, 0, 7],
    "Volos Drummers": [18, 9, 1, 8],
    "Air Condition": [6, 1, 0, 5],
    Snipers: [6, 2, 0, 4],
    Trixes: [5, 0, 0, 5],
    "Team Till Death": [7, 1, 0, 6],
    Hoopers: [6, 1, 0, 5],
    Chewbacca: [6, 2, 0, 4],
    Axtarmades: [6, 1, 0, 5],
    Fintani: [6, 2, 0, 4]
  }
};

const careerTeamAliases = {
  "a/c": "air condition",
  "golden b.": "golden bullet",
  skiouroi: "skiouroi pc",
  swmg: "shadow wizard money gang",
  thryloi: "oi thryloi",
  "volos dr.": "volos drummers"
};

const careerPlayerSeasonOverrides = {
  filippoujr: { PSL4: [26, 16, 0, 10] },
  xifaras: { PSL4: [2, 0, 0, 2] },
  loverdos: { PSL5: [3, 0, 0, 3] },
  kvas: { PSL5: [1, 0, 0, 1] },
  mpog: { PSL4: [2, 1, 0, 1] },
  passas: { PSL4: [7, 0, 0, 7] },
  mermigas: { PSL4: [7, 0, 0, 7] },
  filios: { PSL4: [18, 14, 1, 3] },
  teogan: { PSL4: [5, 3, 0, 2] },
  vozidis: { PSL4: [1, 0, 0, 1] },
  karamolegkos: { PSL4: [2, 0, 0, 2] },
  paterakis: { PSL4: [3, 0, 0, 3] },
  glezos: { PSL4: [18, 10, 0, 8], PSL5: [3, 1, 0, 2] },
  stavropoulos: { PSL4: [1, 0, 0, 1] },
  harrisrigas: { PSL4: [17, 3, 0, 14] },
  gkiolias: { PSL4: [13, 1, 0, 12] },
  kepe: { PSL4: [6, 2, 0, 4] }
};

const psl6CareerPlayerSubtractions = {
  harrisrigas: [1, 0, 0, 1],
  efstajr: [3, 3, 0, 0],
  stefanis: [1, 0, 0, 1],
  tziovanis: [1, 0, 0, 1],
  mermigas: [3, 2, 0, 1],
  stavropoulos: [5, 4, 0, 1],
  nb74: [6, 3, 0, 3],
  cali: [5, 2, 0, 3],
  priovolos: [5, 0, 0, 5],
  maragkos: [1, 0, 0, 1],
  chalikias: [3, 0, 0, 3],
  toussi: [2, 1, 0, 1],
  theof: [1, 1, 0, 0],
  iro: [3, 1, 0, 2]
};

const psl6CareerPlayerFrozenStats = {
  johanito: [4, 3, 0, 1]
};

const psl6CareerFixtures = [
  ["EX7T", "Midi Kidz"], ["Hornets", "BADiles"], ["Team Till Death", "Volos Drummers"],
  ["BADiles", "EX7T"], ["Volos Drummers", "Midi Kidz"], ["Team Till Death", "Hornets"],
  ["EX7T", "Volos Drummers"], ["BADiles", "Team Till Death"], ["Midi Kidz", "Hornets"],
  ["Team Till Death", "EX7T"], ["Hornets", "Volos Drummers"], ["Midi Kidz", "BADiles"],
  ["EX7T", "Hornets"], ["Team Till Death", "Midi Kidz"], ["Volos Drummers", "BADiles"],
  ["Lampater", "Polo"], ["Air Condition", "Ksades"], ["Basement Boys", "R1"],
  ["Ksades", "Lampater"], ["R1", "Polo"], ["Basement Boys", "Air Condition"],
  ["Lampater", "R1"], ["Ksades", "Basement Boys"], ["Polo", "Air Condition"],
  ["Basement Boys", "Lampater"], ["Air Condition", "R1"], ["Polo", "Ksades"],
  ["Lampater", "Air Condition"], ["Basement Boys", "Polo"], ["R1", "Ksades"],
  ["Axtarmades", "Niki Alimou"], ["Oi Thryloi", "Golden Bullet"], ["Spasmena Mila", "Hitters"],
  ["Golden Bullet", "Axtarmades"], ["Hitters", "Niki Alimou"], ["Spasmena Mila", "Oi Thryloi"],
  ["Axtarmades", "Hitters"], ["Golden Bullet", "Spasmena Mila"], ["Niki Alimou", "Oi Thryloi"],
  ["Spasmena Mila", "Axtarmades"], ["Oi Thryloi", "Hitters"], ["Niki Alimou", "Golden Bullet"],
  ["Axtarmades", "Oi Thryloi"], ["Spasmena Mila", "Niki Alimou"], ["Hitters", "Golden Bullet"]
];

const psl6CareerLeagueFixtures = [
  ["Midi Kidz", "Team Till Death"], ["Basement Boys", "Axtarmades"], ["R1", "Lampater"],
  ["Spasmena Mila", "Volos Drummers"], ["Thryloi", "BADiles"], ["Axtarmades", "Midi Kidz"],
  ["Lampater", "Team Till Death"], ["Volos Drummers", "Basement Boys"], ["BADiles", "R1"],
  ["Thryloi", "Spasmena Mila"], ["Midi Kidz", "Lampater"], ["Axtarmades", "Volos Drummers"],
  ["Team Till Death", "BADiles"], ["Basement Boys", "Thryloi"], ["R1", "Spasmena Mila"],
  ["Volos Drummers", "Midi Kidz"], ["BADiles", "Lampater"], ["Thryloi", "Axtarmades"],
  ["Spasmena Mila", "Team Till Death"], ["R1", "Basement Boys"], ["Midi Kidz", "BADiles"],
  ["Volos Drummers", "Thryloi"], ["Lampater", "Spasmena Mila"], ["Axtarmades", "R1"],
  ["Team Till Death", "Basement Boys"], ["Thryloi", "Midi Kidz"], ["Spasmena Mila", "BADiles"],
  ["R1", "Volos Drummers"], ["Basement Boys", "Lampater"], ["Team Till Death", "Axtarmades"],
  ["Midi Kidz", "Spasmena Mila"], ["Thryloi", "R1"], ["BADiles", "Basement Boys"],
  ["Volos Drummers", "Team Till Death"], ["Lampater", "Axtarmades"], ["R1", "Midi Kidz"],
  ["Basement Boys", "Spasmena Mila"], ["Team Till Death", "Thryloi"], ["Axtarmades", "BADiles"],
  ["Lampater", "Volos Drummers"], ["Midi Kidz", "Basement Boys"], ["R1", "Team Till Death"],
  ["Spasmena Mila", "Axtarmades"], ["Thryloi", "Lampater"], ["BADiles", "Volos Drummers"]
];

function normalizeCareerTeamName(teamName) {
  const team = String(teamName || "").trim().toLowerCase();
  return careerTeamAliases[team] || team;
}

function getCareerTeamRecord(season, teamName) {
  const normalizedTeam = normalizeCareerTeamName(teamName);
  const records = careerTeamRecords[season] || {};
  const team = Object.keys(records).find(name => normalizeCareerTeamName(name) === normalizedTeam);
  return team ? records[team] : null;
}

function getArchivedCareerStats(player) {
  const totals = { games: 0, wins: 0, draws: 0, losses: 0, unrecordedSeasons: 0 };
  const overrides = careerPlayerSeasonOverrides[player.id] || {};
  const appliedOverrides = new Set();
  (player.seasons || []).forEach(season => {
    if (season.season === "PSL6") return;
    let record = overrides[season.season];
    if (record) {
      if (appliedOverrides.has(season.season)) return;
      appliedOverrides.add(season.season);
    } else {
      record = getCareerTeamRecord(season.season, season.team);
    }
    if (!record) {
      totals.unrecordedSeasons++;
      return;
    }
    totals.games += record[0];
    totals.wins += record[1];
    totals.draws += record[2];
    totals.losses += record[3];
  });
  return totals;
}

function renderCareerStats(stats) {
  const noRecordedGames = stats.games === 0;
  const unknown = noRecordedGames && stats.unrecordedSeasons > 0;
  return `
    <div class="player-stat"><span>Games Played</span><strong>${unknown ? '—' : stats.games}</strong></div>
    <div class="player-stat"><span>Won / Drawn / Lost</span><strong>${unknown ? '— / — / —' : `${stats.wins} / ${stats.draws} / ${stats.losses}`}</strong></div>
    <div class="player-stat"><span>Win Rate</span><strong>${unknown ? '—' : noRecordedGames ? '0.0%' : `${(stats.wins / stats.games * 100).toFixed(1)}%`}</strong></div>`;
}

function careerStatsNote(stats, currentSeasonUnavailable = false) {
  if (currentSeasonUnavailable) return "Some current-season results could not be loaded; totals include available results only.";
  if (stats.games === 0 && stats.unrecordedSeasons > 0) return "No match results are available for the player's recorded teams.";
  if (stats.unrecordedSeasons > 0) return "Some team-season results are unavailable; totals include recorded matches only.";
  return "Team results from recorded season archives.";
}

function addPsl6CareerMatch(totals, psl6Teams, home, away, homeScore, awayScore, winner = null) {
  const homeTeam = normalizeCareerTeamName(home);
  const awayTeam = normalizeCareerTeamName(away);
  if (homeTeam === awayTeam || (!psl6Teams.has(homeTeam) && !psl6Teams.has(awayTeam))) return;

  totals.games++;
  if (!winner && homeScore === awayScore) {
    totals.draws++;
    return;
  }

  const winningTeam = winner
    ? normalizeCareerTeamName(winner)
    : homeScore > awayScore ? homeTeam : awayTeam;
  if (winningTeam === homeTeam) {
    if (psl6Teams.has(homeTeam)) totals.wins++;
    else totals.losses++;
  } else if (winningTeam === awayTeam) {
    if (psl6Teams.has(awayTeam)) totals.wins++;
    else totals.losses++;
  }
}

function addPsl6FixtureStats(totals, psl6Teams, fixtures, matchRecords, firstFixtureId) {
  fixtures.forEach(([home, away], index) => {
    const record = matchRecords[String(firstFixtureId + index)];
    if (!record || record.hs == null || record.as == null || record.hs === "" || record.as === "") return;
    const homeScore = Number(record.hs);
    const awayScore = Number(record.as);
    if (!Number.isFinite(homeScore) || !Number.isFinite(awayScore)) return;
    addPsl6CareerMatch(totals, psl6Teams, home, away, homeScore, awayScore);
  });
}

function getPsl6Teams(player) {
  return new Set((player.seasons || [])
    .filter(season => season.season === "PSL6")
    .map(season => normalizeCareerTeamName(season.team)));
}

function addPsl6CareerStats(totals, player, matchRecords) {
  const psl6Teams = getPsl6Teams(player);
  if (!psl6Teams.size) return;

  addPsl6FixtureStats(totals, psl6Teams, psl6CareerFixtures, matchRecords, 1000);
  addPsl6FixtureStats(totals, psl6Teams, psl6CareerLeagueFixtures, matchRecords, 2000);
}

function addPsl6CupCareerStats(totals, player, cupData) {
  const psl6Teams = getPsl6Teams(player);
  if (!psl6Teams.size) return;

  let participants = cupData.participants.slice(0, 32);
  const results = cupData.results;
  const rounds = [
    { matches: 16, offset: 0 },
    { matches: 8, offset: 16 },
    { matches: 4, offset: 24 },
    { matches: 2, offset: 28 },
    { matches: 1, offset: 30 }
  ];

  rounds.forEach((round, roundIndex) => {
    const winners = [];
    for (let matchIndex = 0; matchIndex < round.matches; matchIndex++) {
      const home = participants[matchIndex * 2];
      const away = participants[matchIndex * 2 + 1];
      const matchNumber = round.offset + matchIndex + 1;
      const result = results[`PSL6CUP${String(matchNumber).padStart(3, "0")}`]
        || results[`r${roundIndex}m${matchIndex}`];
      let winner = null;

      if (home === "bye" && away && away !== "bye") winner = away;
      else if (away === "bye" && home && home !== "bye") winner = home;
      else if (home && away && home !== "bye" && away !== "bye" && result
        && (result.winner === home || result.winner === away)) {
        winner = result.winner;
        const homeScore = Number(result.hs);
        const awayScore = Number(result.as);
        if (Number.isFinite(homeScore) && Number.isFinite(awayScore)) {
          addPsl6CareerMatch(totals, psl6Teams, home, away, homeScore, awayScore, winner);
        }
      }

      winners.push(winner);
    }
    participants = winners;
  });
}

function addPsl6CareerSeasonStats(totals, player, matchRecords, cupData) {
  const seasonStats = { games: 0, wins: 0, draws: 0, losses: 0 };
  const frozenStats = psl6CareerPlayerFrozenStats[player.id];
  if (frozenStats) {
    seasonStats.games = frozenStats[0];
    seasonStats.wins = frozenStats[1];
    seasonStats.draws = frozenStats[2];
    seasonStats.losses = frozenStats[3];
  } else {
    if (matchRecords) addPsl6CareerStats(seasonStats, player, matchRecords);
    if (cupData) addPsl6CupCareerStats(seasonStats, player, cupData);

    if (matchRecords && cupData) {
      const subtraction = psl6CareerPlayerSubtractions[player.id];
      if (subtraction) {
        seasonStats.games -= subtraction[0];
        seasonStats.wins -= subtraction[1];
        seasonStats.draws -= subtraction[2];
        seasonStats.losses -= subtraction[3];
      }
    }
  }

  totals.games += seasonStats.games;
  totals.wins += seasonStats.wins;
  totals.draws += seasonStats.draws;
  totals.losses += seasonStats.losses;
}
