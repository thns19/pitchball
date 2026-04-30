// ═══════════════════════════════════════════════════════════════
// PSL5 GROUP STAGE MATCH DATA
// ═══════════════════════════════════════════════════════════════
// ID format: GS_{HomeNoSpaces}_{AwayNoSpaces}
// (must match the ID generated in history.html)
//
// group: "Group A", "Group B", or "Group C"
//
// event types:
//   "goal" — clean double bounce point
//   "og"   — own goal (error gifting a point to opponent)
//   "sub"  — substitution (no score change)
//
// For goal/og: { type, team, player, hs, as }
//   team   = the team that BENEFITS (scores the point)
//   player = player who scored (goal) or made the error (og)
//   hs/as  = score AFTER this event
//
// For sub: { type, team, in: "Player", out: "Player" }
// ═══════════════════════════════════════════════════════════════

const groupMatchData = [

  // ── GROUP A ──────────────────────────────────────────────────

{
  id: "GS_BADiles_SpasmenaMila",
  home: "BADiles", away: "Spasmena Mila", hs: 5, as: 2,
  date: "25/09/2025, 10:44AM", mvp: "Thanos Chatziiordanou", group: "Group A",
  events: [
    { type:"goal", team:"BADiles",        player:"Dimitris Gavalas",       hs:5, as:2 },
    { type:"og",   team:"Spasmena Mila",  player:"Dimitris Gavalas",       hs:4, as:2 },
    { type:"goal", team:"BADiles",        player:"Thanos Chatziiordanou",  hs:4, as:1 },
    { type:"og",   team:"BADiles",        player:"Aris Tsertos",           hs:3, as:1 },
    { type:"og",   team:"Spasmena Mila",  player:"Dimitris Gavalas",       hs:2, as:1 },
    { type:"goal", team:"BADiles",        player:"Thanos Chatziiordanou",  hs:2, as:0 },
    { type:"goal", team:"BADiles",        player:"Dimitris Gavalas",       hs:1, as:0 }
  ]
},
{
  id: "GS_AC_Snipers",
  home: "A/C", away: "Snipers", hs: 0, as: 5,
  date: "25/09/2025, 12:33PM", mvp: "Giannis Stefanis", group: "Group A",
  events: [
    { type:"goal", team:"Snipers", player:"Giannis Stefanis", hs:0, as:5 },
    { type:"goal", team:"Snipers", player:"Giannis Stefanis", hs:0, as:4 },
    { type:"goal", team:"Snipers", player:"Antonis Iliadis",  hs:0, as:3 },
    { type:"goal", team:"Snipers", player:"Antonis Iliadis",  hs:0, as:2 },
    { type:"og",   team:"Snipers", player:"Orfeas Maragkos",  hs:0, as:1 }
  ]
},
{
  id: "GS_MidiKidz_Trixes",
  home: "Midi Kidz", away: "Trixes", hs: 5, as: 0,
  date: null, mvp: null, group: "Group A",
  events: [
    { type:"og", team:"Midi Kidz", player:"Trixes forfeit", hs:5, as:0 }
  ]
},
{
  id: "GS_Snipers_BADiles",
  home: "Snipers", away: "BADiles", hs: 0, as: 5,
  date: "07/10/2025, 13:10PM", mvp: "Thanos Chatziiordanou", group: "Group A",
  events: [
    { type:"goal", team:"BADiles", player:"Thanos Chatziiordanou", hs:0, as:5 },
    { type:"goal", team:"BADiles", player:"Thanos Chatziiordanou", hs:0, as:4 },
    { type:"goal", team:"BADiles", player:"Thanos Chatziiordanou", hs:0, as:3 },
    { type:"og",   team:"BADiles", player:"Giannis Stefanis",      hs:0, as:2 },
    { type:"og",   team:"BADiles", player:"Antonis Iliadis",       hs:0, as:1 }
  ]
},
{
  id:"GS_Trixes_SpasmenaMila",home:"Trixes",away:"Spasmena Mila",hs:0,as:5,date:null,mvp:null,group:"Group A",events: [
    {type:"og",team:"Spasmena Mila",player:"Trixes forfeit",hs:0,as:5}
  ]
}

  // ── GROUP B ──────────────────────────────────────────────────

  // {
  //   id: "GS_Phoenix_TeamTillDeath",
  //   home: "Phoenix", away: "Team Till Death", hs: 5, as: 0,
  //   date: null, mvp: null, group: "Group B",
  //   events: []
  // },

  // ── GROUP C ──────────────────────────────────────────────────

  // {
  //   id: "GS_Babiniotes_Chewbacca",
  //   home: "Babiniotes", away: "Chewbacca", hs: 6, as: 4,
  //   date: null, mvp: null, group: "Group C",
  //   events: []
  // },

  // ── ADD YOUR MATCHES BELOW ───────────────────────────────────

];
