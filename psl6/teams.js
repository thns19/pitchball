// Shared PSL6 team data for browser pages.
// Ratings are on a 1–100 scale (att/def/stm/con/ten).
window.PSL6_DATA = {
  cupRatings: {
    "Sapioi":    {att:27, def:24, stm:32, con:45, ten:26},
    "Kritsinia": {att:30, def:27, stm:40, con:42, ten:37}
  },
  teams: {
    "BADiles":         {att:90, def:90, stm:78, con:91, ten:81, tactic:"Zonal",   notes:"Thanos Chatziiordanou, Dimitris Gavalas"},
    "R1":              {att:90, def:85, stm:89, con:83, ten:77, tactic:"Fluid",   notes:"Nikolas Moschonas, Michalis Lerogiannis"},
    "Volos Drummers":  {att:68, def:81, stm:73, con:72, ten:63, tactic:"Zonal",   notes:"Vasilis Tzovanis, Giorgos Zacharopoulos, Giannis Stefanis"},
    "Oi Thryloi":      {att:82, def:84, stm:84, con:83, ten:76, tactic:"Zonal", notes:"Vasilis Efstathiou, Alexandros Kalofolias"},
    "Basement Boys":   {att:83, def:80, stm:82, con:64, ten:72, tactic:"Front-Back", notes:"Jordan Aslanis, Spyros Koskinas"},
    "Team Till Death": {att:58, def:55, stm:55, con:52, ten:31, tactic:"Zonal", notes:"Giorgos Karamolegkos, Miltos Kapnakis"},
    "Spasmena Mila":   {att:79, def:75, stm:72, con:69, ten:55, tactic:"Front-Back", notes:"Aris Tsertos, Kalliopi Tsertou, Taxiarchis Kassotakis, Petros Papaspyropoulos"},
    "Lampater":        {att:85, def:80, stm:82, con:73, ten:76, tactic:"Zonal", notes:"Johan Pilichos, Tzannis Mermigas, Stavros Stavropoulos, Giannis Akridas"},
    "Axtarmades":      {att:87, def:82, stm:85, con:77, ten:88, tactic:"Zonal", notes:"Giorgos Filippou, Filippos Efstathiou, Harris Rigas"},
    "Midi Kidz":       {att:62, def:61, stm:62, con:59, ten:61, tactic:"Front-Back", notes:"Stefanos Mavrogiannis, Stavros Moutaftsidis"},
    "EX7T":            {att:46, def:53, stm:49, con:55, ten:32, tactic:"Front-Back", notes:"Sokratis Gkiolias Jr., Avaris Ntzamilis"},
    "Polo":            {att:78, def:73, stm:77, con:73, ten:65, tactic:"Front-Back", notes:"Dimitris Antoninis, Filippos Laskaris"},
    "Hornets":         {att:37, def:50, stm:44, con:34, ten:30, tactic:"Zonal", notes:"Christos Katopodis, Ennio Georgopoulos"},
    "Ksades":          {att:34, def:40, stm:37, con:42, ten:31, tactic:"Unknown", notes:"Foivos Dousis, Konstantinos Sfikas"},
    "Golden Bullet":   {att:41, def:48, stm:49, con:44, ten:35, tactic:"Zonal", notes:"Giannis Katsavounis, Markos Kanellidis"},
    "Niki Alimou":     {att:19, def:20, stm:29, con:11, ten:6, tactic:"Chaos", notes:"Dionysis Halikias, Panagiotis Perdikis, Orfeas Maragkos"},
    "Air Condition":   {att:41, def:35, stm:49, con:40, ten:35, tactic:"Front-Back", notes:"Giannis Kordopatis, Pavlos Tsonis"},
    "Hitters":         {att:43, def:50, stm:52, con:60, ten:54, tactic:"Zonal", notes:"Iro Ganti, Polixeni Toussi, Theofania Sotiropoulou"},
  },
  logos: {
    "BADiles": "logos/badiles.png",
    "R1": "logos/r1.png",
    "Volos Drummers": "logos/volos.png",
    "Oi Thryloi": "logos/thryloi.png",
    "Basement Boys": "logos/basement.png",
    "Hitters": "logos/hitters.png",
    "Team Till Death": "logos/ttd.png",
    "Spasmena Mila": "logos/spasmena.png",
    "Lampater": "logos/lpc.png",
    "EX7T": "logos/ex7t.png",
    "Polo": "logos/polo.png",
    "Hornets": "logos/hornets.png",
    "Ksades": "logos/ksades.png",
    "Axtarmades": "logos/axtar.png",
    "Golden Bullet": "logos/gb.png",
    "Niki Alimou": "logos/alimou.png",
    "Midi Kidz": "logos/midi.png",
    "Air Condition": "logos/ac.png"
  }
};
window.PSL6_DATA.names = Object.keys(window.PSL6_DATA.teams);
