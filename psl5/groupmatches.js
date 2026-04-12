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

  // {
  //   id: "GS_BADiles_SpasmenaMila",
  //   home: "BADiles", away: "Spasmena Mila", hs: 5, as: 2,
  //   date: null, mvp: null, group: "Group A",
  //   events: []
  // },

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
