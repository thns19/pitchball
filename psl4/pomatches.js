// ═══════════════════════════════════════════════════════════════
// PSL4 PLAYOFF MATCH DATA
// ═══════════════════════════════════════════════════════════════
// ID format: PO_{RoundNoSpaces}_{HomeNoSpaces}_{AwayNoSpaces}
//
// For series matches, include sets array and per-set events:
//   sets: [ {hs: 6, as: 7}, {hs: 5, as: 7}, ... ]
//   set1Events: [...], set2Events: [...], etc.
//
// For play-in matches (no sets), use events: [...] directly.
//
// event types:
//   "goal" — clean double bounce point
//   "og"   — own goal
//   "sub"  — substitution
//   "var"  — VAR decision (Video Assistant Referee)
//
// For goal/og: { type, team, player, hs, as }
//   team   = the team that BENEFITS (scores the point)
//   player = player who scored (goal) or made the error (og)
//   hs/as  = score AFTER this event
//
// For sub: { type, team, in: "Player", out: "Player" }
//
// For var: { type, team, decision, hs, as }
//   team     = team that benefits from the decision
//   decision = description of the VAR ruling
//   hs/as    = score AFTER this event (if score changes)
// ═══════════════════════════════════════════════════════════════

const poMatchData = [

  // ── PLAY-INS (no sets) ────────────────────────────────────
  // {
  //   id: "PO_PlayIns_NFFC_BasementBoys",
  //   home: "NFFC", away: "Basement Boys", hs: 0, as: 7,
  //   date: null, mvp: null, round: "Play-ins",
  //   sets: null,
  //   events: [
  //     {type:"goal", team:"Basement Boys", player:"Iordanis Aslanis",      hs:0, as:1},
  //     {type:"og",   team:"Basement Boys", player:"Alexandros Kalofolias", hs:0, as:2},
  //     {type:"var",  team:"NFFC", decision:"Goal disallowed — illegal serve", hs:0, as:2},
  //     {type:"sub",  team:"NFFC", in:"Player In", out:"Player Out"},
  //   ]
  // },

  // ── QUARTER-FINALS ────────────────────────────────────────
  // {
  //   id: "PO_QuarterFinalsBestof3_Kleftes_BasementBoys",
  //   home: "Kleftes", away: "Basement Boys",
  //   hSets: 0, aSets: 2,
  //   sets: [{hs:6,as:7},{hs:5,as:7}],
  //   date: null, mvp: null, round: "Quarter-Finals",
  //   set1Events: [
  //     {type:"goal", team:"Basement Boys", player:"Iordanis Aslanis", hs:0, as:1},
  //     {type:"var",  team:"Kleftes", decision:"Point awarded after review", hs:1, as:1},
  //   ],
  //   set2Events: [],
  // },

  // ── SEMI-FINALS ───────────────────────────────────────────
  // {
  //   id: "PO_SemiFinalsBestof3_BasementBoys_AXR",
  //   home: "Basement Boys", away: "AXR",
  //   hSets: 0, aSets: 2,
  //   sets: [{hs:4,as:7},{hs:6,as:7}],
  //   date: null, mvp: null, round: "Semi-Finals",
  //   set1Events: [],
  //   set2Events: [],
  // },

  // ── FINAL ─────────────────────────────────────────────────
  // {
  //   id: "PO_FinalBestof5_AXR_Russia",
  //   home: "AXR", away: "Russia",
  //   hSets: 0, aSets: 3,
  //   sets: [{hs:6,as:7},{hs:5,as:7},{hs:3,as:7}],
  //   date: "12/06/2025, 12:11PM", mvp: "Kostas Kapetanios", round: "Final",
  //   set1Events: [
  //     {type:"goal", team:"Russia", player:"Kostas Kapetanios", hs:0, as:1},
  //   ],
  //   set2Events: [],
  //   set3Events: [],
  // },

  // ── ADD YOUR MATCHES BELOW ────────────────────────────────
  {
    id: "PO_FinalBestof5_AXR_Russia",
    home: "AXR", away: "Russia",
    hSets: 0, aSets: 3,
    sets: [{hs:6,as:7},{hs:5,as:7},{hs:3,as:7}],
    date: "12/06/2025, 12:11PM", mvp: "Kostas Kapetanios", round: "Final",
    set1Events: [
      {type:"goal", team:"Russia", player:"Kostas Kapetanios", hs:6, as:7},
      {type:"og", team:"AXR", player:"Kostas Kapetanios", hs:6, as:6},
      {type:"og", team:"Russia", player:"Giorgos Filippou", hs:5, as:6},
      {type:"og", team:"AXR", player:"Kostas Kapetanios", hs:5, as:5},
      {type:"goal", team:"Russia", player:"Kostas Kapetanios", hs:4, as:5},
      {type:"og", team:"AXR", player:"Kostas Kapetanios", hs:4, as:4},
      {type:"og", team:"AXR", player:"Kostas Kapetanios", hs:3, as:4},
      {type:"og", team:"Russia", player:"Giorgos Filippou", hs:2, as:4},
      {type:"og", team:"AXR", player:"Kostas Kapetanios", hs:2, as:3},
      {type:"og", team:"Russia", player:"Giorgos Filippou", hs:1, as:3},
      {type:"goal", team:"Russia", player:"Kostas Kapetanios", hs:1, as:2},
      {type:"goal", team:"Russia", player:"Kostas Kapetanios", hs:1, as:1},
      {type:"og", team:"AXR", player:"Kostas Kapetanios", hs:1, as:0},
    ],
    set2Events: [
      {type:"goal", team:"Russia", player:"Kostas Kapetanios", hs:5, as:7},
      {type:"og", team:"AXR", player:"Kostas Kapetanios", hs:5, as:6},
      {type:"goal", team:"AXR", player:"Giorgos Filippou", hs:4, as:6},
      {type:"goal", team:"Russia", player:"Kostas Kapetanios", hs:3, as:6},
      {type:"og", team:"Russia", player:"Kostis Vasileiou", hs:3, as:5},
      {type:"og", team:"AXR", player:"Kostas Kapetanios", hs:3, as:4},
      {type:"og", team:"Russia", player:"Giorgos Filippou", hs:2, as:4},
      {type:"og", team:"AXR", player:"Taxiarchis Kassotakis", hs:2, as:3},
      {type:"og", team:"AXR", player:"Taxiarchis Kassotakis", hs:1, as:3},
      {type:"og", team:"Russia", player:"Giorgos Filippou", hs:0, as:3},
      {type:"goal", team:"Russia", player:"Taxiarchis Kassotakis", hs:0, as:2},
      {type:"og", team:"Russia", player:"Kostis Vasileiou", hs:0, as:1}
    ],
    set3Events: [
      {type:"og", team:"Russia", player:"Giorgos Filippou", hs:3, as:7},
      {type:"og", team:"AXR", player:"Taxiarchis Kassotakis", hs:3, as:6},
      {type:"og", team:"AXR", player:"Kostas Kapetanios", hs:2, as:6},
      {type:"goal", team:"Russia", player:"Kostas Kapetanios", hs:1, as:6},
      {type:"header", team:"Russia", player:"Kostas Kapetanios", hs:1, as:5},
      {type:"og", team:"Russia", player:"Kostis Vasileiou", hs:1, as:4},
      {type:"og", team:"AXR", player:"Kostas Kapetanios", hs:1, as:3},
      {type:"goal", team:"Russia", player:"Kostas Kapetanios", hs:0, as:3},
      {type:"goal", team:"Russia", player:"Kostas Kapetanios", hs:0, as:2},      
      {type:"og", team:"Russia", player:"Giorgos Filippou", hs:0, as:1}
    ]
  }
];
