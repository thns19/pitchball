// ═══════════════════════════════════════════════════════════════
// PSL5 CUP MATCH DATA
// ═══════════════════════════════════════════════════════════════
// ID format: CUP_{RoundNoSpaces}_{HomeNoSpaces}_{AwayNoSpaces}
// (must match the ID generated in history.html)
//
// round: "PlayIn", "RoundOf16", "QuarterFinals", "SemiFinals", "Final"
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

const cupMatchData = [

  // ── PLAY-IN ───────────────────────────────────────────────────

  // {
  //   id: "CUP_Playin_TeamTillDeath_Axtarmades",
  //   home: "Team Till Death", away: "Axtarmades", hs: 5, as: 4,
  //   date: null, mvp: null, round: "Play-in",
  //   events: []
  // },

  // ── ROUND OF 16 ───────────────────────────────────────────────

  // {
  //   id: "CUP_RoundOf16_BADiles_TeamTillDeath",
  //   home: "BADiles", away: "Team Till Death", hs: 5, as: 0,
  //   date: null, mvp: null, round: "Round of 16",
  //   events: []
  // },

  // ── QUARTER-FINALS ────────────────────────────────────────────

  // {
  //   id: "CUP_QuarterFinals_BADiles_VolosDrummers",
  //   home: "BADiles", away: "Volos Drummers", hs: 5, as: 2,
  //   date: null, mvp: null, round: "Quarter-Finals",
  //   events: []
  // },

  // ── SEMI-FINALS ───────────────────────────────────────────────

  // {
  //   id: "CUP_SemiFinals_BADiles_SpasmenaMila",
  //   home: "BADiles", away: "Spasmena Mila", hs: 5, as: 1,
  //   date: null, mvp: null, round: "Semi-Finals",
  //   events: []
  // },

  // ── FINAL ─────────────────────────────────────────────────────

  // {
  //   id: "CUP_Final_BADiles_YY",
  //   home: "BADiles", away: "Y&Y", hs: 6, as: 7,
  //   date: null, mvp: null, round: "Final",
  //   events: []
  // },

  // ── ADD YOUR MATCHES BELOW ────────────────────────────────────

];
