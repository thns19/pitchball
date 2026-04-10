// ═══════════════════════════════════════════════════════════════
// PSL5 MATCH DATA
// ═══════════════════════════════════════════════════════════════
// events array is sequential — first event is the first point of the match
// event types:
//   "goal"  — clean double bounce point
//   "og"    — own goal (error gifting a point to opponent)
//   "sub"   — substitution (no score change)
//
// For goal/og: { type, team, player, hs, as }
//   team  = the team that BENEFITS (scores the point)
//   player = player who scored (goal) or player who made the error (og)
//   hs/as = score AFTER this event
//
// For sub: { type, team, in: "Player", out: "Player" }
//   no hs/as needed
//
// mvp: player name string or null
// date: "DD/MM/YYYY" or null
// ═══════════════════════════════════════════════════════════════

const matchData = [

  {
    id: "MD1_SpasmenaMila_YY",
    home: "Spasmena Mila", away: "Y&Y", hs: 3, as: 5,
    date: "15/01/2026, 10:40AM", mvp: "Giorgos Filippou",
    events: [
        {type:"goal",team:"Y&Y",          player:"Giorgos Filippou",       hs:3, as:5},
        {type:"og",  team:"Y&Y",          player:"Giannis Akridas",        hs:3, as:4},
        {type:"goal",team:"Y&Y",          player:"Giannis Akridas",        hs:2, as:4},
        {type:"sub", team:"Spasmena Mila", in:"Iasonas Miliaras",          out:"Petros Papaspyropoulos"},
        {type:"og",  team:"Spasmena Mila",          player:"Giannis Akridas",        hs:2, as:3},
        {type:"goal",team:"Y&Y",          player:"Giorgos Filippou",       hs:1, as:3},
        {type:"og",  team:"Y&Y",          player:"Aris Tsertos",           hs:1, as:2},
        {type:"goal",team:"Y&Y",player:"Giorgos Filippou",           hs:1, as:1},
        {type:"og",  team:"Spasmena Mila",          player:"Giorgos Filippou",       hs:1, as:0},
    ]
  },
  {
    id: "MD1_MidiKidz_BasementBoys",
    home: "Midi Kidz", away: "Basement Boys", hs: 3, as: 5,
    date: "15/01/2026, 11:33AM", mvp: "Jordan Aslanis",
    events: [
      {type:"og", team:"Basement Boys", player:"Stefanos Mavrogiannis", hs:3, as:5},
      {type:"og", team:"Midi Kidz", player:"Spyros Koskinas", hs:3, as:4},
      {type:"og", team:"Basement Boys", player:"Tzannis Mermigkas", hs:2, as:4},
      {type:"goal", team:"Basement Boys", player:"Jordan Aslanis", hs:2, as:3},
      {type:"goal", team:"Basement Boys", player:"Spyros Koskinas", hs:2, as:2},
      {type:"og", team:"Basement Boys", player:"Stefanos Mavrogiannis", hs:2, as:1},
      {type:"og", team:"Midi Kidz", player:"Spyros Koskinas", hs:2, as:0},
      {type:"og", team:"Midi Kidz", player:"Jordan Aslanis", hs:1, as:0},    
    ]
  },
  {
    id:"MD1_Babiniotes_BADiles",
    home: "Babiniotes", away:"BADiles", hs: 0, as: 5,
    date: "27/01/2026, 14:04PM", mvp: "Thanos Chatziiordanou",
    events: [
      {type: "goal", team:"BADiles", player:"Thanos Chatziiordanou", hs:0, as:5},
      {type: "og", team:"BADiles", player:"Stavros Stavropoulos", hs:0, as:4},
      {type: "og", team:"BADiles", player:"Stavros Stavropoulos", hs:0, as:3},
      {type: "goal", team:"BADiles", player:"Thanos Chatziiordanou", hs:0, as:2},
      {type: "og", team:"BADiles", player:"Stavros Stavropoulos", hs:0, as:1},
    ]
  },
  {
    id:"MD1_Warriors_Phoenix",
    home: "Warriors", away:"Phoenix", hs: 5, as: 0,
    date: null, mvp: null,
    events: [
      {type: "og", team:"Warriors", player:"Phoenix forfeit", hs:5, as:0},
    ]
  },
  {
    id:"MD2_Phoenix_SpasmenaMila",
    home: "Phoenix", away:"Spasmena Mila", hs: 0, as: 5,
    date: null, mvp: null,
    events: [
      {type: "og", team:"Spasmena Mila", player:"Phoenix forfeit", hs:0, as:5},
    ]
  },
  {
    id:"MD3_BasementBoys_Phoenix",
    home: "Basement Boys", away:"Phoenix", hs: 5, as: 0,
    date: null, mvp: null,
    events: [
      {type: "og", team:"Basement Boys", player:"Phoenix forfeit", hs:5, as:0},
    ]
  },
  {
    id:"MD4_Phoenix_YY",
    home: "Phoenix", away:"Y&Y", hs: 0, as: 5,
    date: null, mvp: null,
    events: [
      {type: "og", team:"Y&Y", player:"Phoenix forfeit", hs:0, as:5},
    ]
  },
  {
    id:"MD5_MidiKidz_Phoenix",
    home: "Midi Kidz", away:"Phoenix", hs: 5, as: 0,
    date: null, mvp: null,
    events: [
      {type: "og", team:"Midi Kidz", player:"Phoenix forfeit", hs:5, as:0},
    ]
  },
  {
    id:"MD6_R1_Phoenix",
    home: "R1", away:"Phoenix", hs: 5, as: 0,
    date: null, mvp: null,
    events: [
      {type: "og", team:"R1", player:"Phoenix forfeit", hs:5, as:0},
    ]
  },
  {
    id:"MD7_Phoenix_Babiniotes",
    home: "Phoenix", away:"Babiniotes", hs: 0, as: 5,
    date: null, mvp: null,
    events: [
      {type: "og", team:"Babiniotes", player:"Phoenix forfeit", hs:0, as:5},
    ]
  },
  {
    id:"MD8_BADiles_Phoenix",
    home: "BADiles", away:"Phoenix", hs: 5, as: 0,
    date: null, mvp: null,
    events: [
      {type: "og", team:"BADiles", player:"Phoenix forfeit", hs:5, as:0},
    ]
  },
  {
    id:"MD9_Phoenix_VolosDrummers",
    home: "Phoenix", away:"Volos Drummers", hs: 0, as: 5,
    date: null, mvp: null,
    events: [
      {type: "og", team:"Volos Drummers", player:"Phoenix forfeit", hs:0, as:5},
    ]
  },
  {
    id:"MD1_R1_VolosDrummers",
    home: "R1", away:"Volos Drummers", hs: 5, as: 2,
    date: "27/01/2026, 12:15PM", mvp: "Michalis Lerogiannis",
    events: [
      {type: "og", team:"R1", player:"Vasilis Tziovanis", hs:5, as:2},
      {type: "goal", team:"R1", player:"Michalis Lerogiannis", hs:4, as:2},
      {type: "og", team:"R1", player:"Giorgos Zacharopoulos", hs:3, as:2},
      {type: "og", team:"R1", player:"Giorgos Zacharopoulos", hs:2, as:2},
      {type: "og", team:"Volos Drummers", player:"Michalis Lerogiannis", hs:1, as:2},
      {type: "og", team:"Volos Drummers", player:"Michalis Lerogiannis", hs:1, as:1},
      {type: "og", team:"R1", player:"Giorgos Zacharopoulos", hs:1, as:0},
    ]
  },
  {
    id:"MD2_BADiles_MidiKidz",
    home: "BADiles", away:"Midi Kidz", hs: 5, as: 1,
    date: "18/02/2026, 10:42AM", mvp: "Dimitris Gavalas",
    events: [
      {type: "og", team:"BADiles", player:"Stefanos Mavrogiannis", hs:5, as:1},
      {type: "goal", team:"BADiles", player:"Dimtris Gavalas", hs:4, as:1},
      {type: "og", team:"BADiles", player:"Tzannis Mermigkas", hs:3, as:1},
      {type: "og", team:"BADiles", player:"Stefanos Mavrogiannis", hs:2, as:1},
      {type:"og", team:"Midi Kidz", player:"Thanos Chatziiordanou", hs:1, as:1},
      {type: "goal", team:"BADiles", player:"Dimitris Gavalas", hs:1, as:0},
    ]
  },

  // ── ADD MORE MATCHES BELOW ──
  // {
  //   id: "MD{n}_{HomeNoSpaces}_{AwayNoSpaces}",
  //   home: "Full Name", away: "Full Name", hs: 0, as: 0,
  //   date: "DD/MM/YYYY", mvp: null,
  //   events: [
  //     {type:"goal", team:"Team Name", player:"Player Name", hs:0, as:1},
  //     {type:"og",   team:"Team Name", player:"Player Name", hs:1, as:1},
  //     {type:"sub",  team:"Team Name", in:"Player In", out:"Player Out"},
  //   ]
  // },

];

// ═══════════════════════════════════════════════════════════════
// TOP SCORERS
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
