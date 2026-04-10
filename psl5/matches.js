// ═══════════════════════════════════════════════════════════════
// PSL5 MATCH DATA
// ═══════════════════════════════════════════════════════════════
// Each match has a unique id matching "MD{matchday}_{home}_{away}"
// breakdown: { home: {points, ownGoals}, away: {points, ownGoals} }
//   points    = clean double-bounce points scored by that team
//   ownGoals  = errors by the OPPONENT that gifted points to this team
//   points + ownGoals should equal that team's final score
// mvp: player name string, or null if not set
// date: "DD/MM/YYYY" string
// ═══════════════════════════════════════════════════════════════

const matchData = [

  // ── MATCHDAY 1 ──
  {
    id: "MD1_MidiKidz_BasementBoys",
    home: "Midi Kidz", away: "Basement Boys", hs: 3, as: 5,
    date: "15/01/2026, 11:33AM", mvp: "Iordanis Aslanis",
    breakdown: { home: {points:0, ownGoals:3}, away: {points:2, ownGoals:3} }
  },
  {
    id: "MD1_Babiniotes_BADiles",
    home: "Babiniotes", away: "BADiles", hs: 0, as: 5,
    date: "15/01/2026, 2:04PM", mvp: "Thanos Chatziiordanou",
    breakdown: { home: {points:0, ownGoals:0}, away: {points:2, ownGoals:3} }
  },
  {
    id: "MD1_SpasmenaMila_YY",
    home: "Spasmena Mila", away: "Y&Y", hs: 3, as: 5,
    date: "15/01/2026, 10:40AM", mvp: "Giorgos Filippou",
    breakdown: { home: {points:0, ownGoals:3}, away: {points:4, ownGoals:1} }
  },
  {
    id: "MD1_R1_VolosDrummers",
    home: "R1", away: "Volos Drummers", hs: 5, as: 2,
    date: "27/01/2026, 12:15PM", mvp: null,
    breakdown: { home: {points:0, ownGoals:5}, away: {points:0, ownGoals:2} }
  },
  {
    id: "MD1_Warriors_Phoenix",
    home: "Warriors", away: "Phoenix", hs: 5, as: 0,
    date: null, mvp: null,
    breakdown: { home: {points:0, ownGoals:5}, away: {points:0, ownGoals:0} }
  },

  // ── MATCHDAY 2 ──
  {
    id: "MD2_BADiles_MidiKidz",
    home: "BADiles", away: "Midi Kidz", hs: 5, as: 1,
    date: "18/02/2026", mvp: null,
    breakdown: { home: {points:0, ownGoals:5}, away: {points:0, ownGoals:1} }
  },
  {
    id: "MD2_YY_BasementBoys",
    home: "Y&Y", away: "Basement Boys", hs: 5, as: 1,
    date: "16/02/2026", mvp: null,
    breakdown: { home: {points:0, ownGoals:5}, away: {points:0, ownGoals:1} }
  },
  {
    id: "MD2_VolosDrummers_Babiniotes",
    home: "Volos Drummers", away: "Babiniotes", hs: 5, as: 3,
    date: "18/02/2026", mvp: null,
    breakdown: { home: {points:0, ownGoals:5}, away: {points:0, ownGoals:3} }
  },
  {
    id: "MD2_Phoenix_SpasmenaМila",
    home: "Phoenix", away: "Spasmena Mila", hs: 0, as: 5,
    date: null, mvp: null,
    breakdown: { home: {points:0, ownGoals:0}, away: {points:0, ownGoals:5} }
  },
  {
    id: "MD2_Warriors_R1",
    home: "Warriors", away: "R1", hs: 1, as: 5,
    date: "17/02/2026", mvp: null,
    breakdown: { home: {points:0, ownGoals:1}, away: {points:0, ownGoals:5} }
  },

  // ── ADD MORE MATCHES BELOW ──
  // Copy this template:
  // {
  //   id: "MD{n}_{Home}_{Away}",   // no spaces in id
  //   home: "Full Team Name", away: "Full Team Name", hs: 0, as: 0,
  //   date: "DD/MM/YYYY", mvp: "Player Name",
  //   breakdown: { home: {points:0, ownGoals:0}, away: {points:0, ownGoals:0} }
  // },

];

// ═══════════════════════════════════════════════════════════════
// TOP SCORERS DATA
// Add or update players here. Season total only.
// ═══════════════════════════════════════════════════════════════

const topScorers = [
  {name: "Dimitris Gavalas",   team: "BADiles",       goals: 24, logo: "logos/badiles.png"},
  {name: "Iordanis Aslanis",   team: "Basement Boys", goals: 22, logo: "logos/basement.png"},
  {name: "Giannis Akridas",    team: "Y&Y",           goals: 20, logo: "logos/yy.png"},
  {name: "Giorgos Filippou",   team: "Y&Y",           goals: 20, logo: "logos/yy.png"},
  {name: "Thanos Chatziiordanou", team: "BADiles",    goals: 18, logo: "logos/badiles.png"},
  {name: "Michalis Lerogiannis",  team: "R1",         goals: 9,  logo: "logos/r1.png"},
  {name: "Nikolas Moschonas",     team: "R1",         goals: 9,  logo: "logos/r1.png"},
  {name: "Iasonas Miliaras",     team: "Spasmena Mila",         goals: 8,  logo: "logos/spasmena.png"},
  {name: "Nikos Kalisperis",     team: "Phoenix",         goals: 7,  logo: "logos/phoenix.png"},
  {name: "Tzannis Mermigas",     team: "Midi Kidz",         goals: 6,  logo: "logos/midi.png"},
];
