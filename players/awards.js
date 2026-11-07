const historicalCompetitions = [
  {
    name: 'PSL1',
    kind: 'league',
    placements: [
      {place: 1, team: 'R1', players: ['mike-lerogiannis', 'joestav']},
      {place: 2, team: 'BADiles', players: ['thanos-chatziiordanou', 'dimitris-gavalas']},
      {place: 3, team: 'AXR', players: ['filios', 'xkapet']},
    ],
    awards: [
      {category: 'MVPs', label: 'League MVP', player: 'dimitris-gavalas'},
      {category: 'MVPs', label: 'Final Four MVP', player: 'mike-lerogiannis'},
    ],
  },
  {
    name: 'PSL2',
    kind: 'league',
    placements: [
      {place: 1, team: 'Brazil', players: ['thanos-chatziiordanou', 'kostas-kapetanios']},
      {place: 2, team: 'AXR', players: ['filios', 'xkapet']},
      {place: 3, team: 'Taximi', players: ['tax', 'bekos']},
    ],
    awards: [{category: 'MVPs', label: 'MVP', player: 'kostas-kapetanios'}],
  },
  {
    name: 'PSL3',
    kind: 'league',
    placements: [
      {place: 1, team: 'BADiles', players: ['dimitris-gavalas', 'efsta']},
      {place: 2, team: 'Clippers', players: ['kostas-kapetanios', 'niknik']},
      {place: 3, team: 'Russia', players: ['teogan', 'giorgos-melidis']},
    ],
    awards: [{category: 'MVPs', label: 'MVP', player: 'giorgos-melidis'}],
  },
  {
    name: 'PSL3 Cup',
    kind: 'cup',
    placements: [{place: 1, team: 'Russia', players: ['teogan', 'giorgos-melidis']}],
  },
  {
    name: 'PSL4',
    kind: 'league',
    placements: [
      {place: 1, team: 'Russia', players: ['kostas-kapetanios', 'tax']},
      {place: 2, team: 'AXR', players: ['filippoujr', 'kvas']},
      {place: 3, team: 'BADiles', players: ['thanos-chatziiordanou', 'dimitris-gavalas']},
      {place: 3, team: 'Basement Boys', players: ['aslanis', 'koskinas']},
    ],
    awards: [
      {category: 'Top Scorers', label: 'Top Scorer', player: 'kostas-kapetanios'},
      {category: 'MVPs', label: 'MVP', player: 'kostas-kapetanios'},
    ],
  },
  {
    name: 'PSL4 Cup',
    kind: 'cup',
    placements: [{place: 1, team: 'AXR', players: ['filios', 'kvas']}],
  },
  {
    name: 'PSL5',
    kind: 'league',
    placements: [
      {place: 1, team: 'BADiles', players: ['thanos-chatziiordanou', 'dimitris-gavalas']},
      {place: 2, team: 'R1', players: ['mike-lerogiannis', 'yman']},
      {place: 3, team: 'Y&Y', players: ['filippoujr', 'akridas', 'kvas']},
      {place: 3, team: 'Basement Boys', players: ['aslanis', 'koskinas']},
    ],
    awards: [
      {category: 'MVPs', label: 'MVP', player: 'dimitris-gavalas'},
      {category: 'Top Scorers', label: 'Top Scorer', player: 'dimitris-gavalas'},
    ],
  },
  {
    name: 'PSL5 Cup',
    kind: 'cup',
    placements: [{place: 1, team: 'Y&Y', players: ['filippoujr', 'akridas']}],
  },
  {
    name: 'PSL 1v1 S1',
    kind: 'medal',
    placements: [
      {place: 1, player: 'kostas-kapetanios'},
      {place: 2, player: 'dimitris-gavalas'},
      {place: 3, player: 'efsta'},
    ],
  },
  {
    name: 'PSL 1v1 S2',
    kind: 'medal',
    placements: [
      {place: 1, player: 'giorgos-melidis'},
      {place: 2, player: 'dimitris-gavalas'},
    ],
  },
  {
    name: 'PSL 3v3 S1',
    kind: 'medal',
    placements: [
      {place: 1, team: 'BADiles', players: ['thanos-chatziiordanou', 'dimitris-gavalas', 'giorgos-melidis']},
      {place: 2, team: 'R1', players: ['mike-lerogiannis', 'filp', 'efsta']},
    ],
  },
];

function getPlacementAwards(competition, placement) {
  const awards = [];
  if (placement.place === 1 && competition.kind !== 'medal') {
    awards.push({
      category: competition.kind === 'cup' ? 'Cup' : 'League',
      label: `${competition.name} Champion`,
      image: competition.kind === 'cup' ? 'pslcup.png' : 'psltrophy.png',
    });
  }
  if (competition.kind !== 'cup') {
    const medal = placement.place === 1
      ? {label: 'Gold Medal', image: 'goldmedal.png'}
      : placement.place === 2
        ? {label: 'Silver Medal', image: 'silvermedal.png'}
        : {label: 'Bronze Medal', image: 'bronzemedal.png'};
    awards.push({
      category: 'Medals',
      label: `${competition.name} ${medal.label}`,
      image: medal.image,
    });
  }
  return awards;
}

function getPlayerAwards(player) {
  const awards = [];
  historicalCompetitions.forEach(competition => {
    competition.placements.forEach(placement => {
      if (!(placement.players || []).includes(player.id) && placement.player !== player.id) return;
      getPlacementAwards(competition, placement)
        .forEach(award => awards.push({...award, text: award.label}));
    });
    (competition.awards || [])
      .filter(award => award.player === player.id)
      .forEach(award => awards.push({
        ...award,
        image: award.category === 'MVPs' ? 'mvptrophy.png' : 'topscorer.png',
        text: `${competition.name} ${award.label}`,
      }));
  });

  (player.titles || []).forEach(text => {
    const match = text.match(/^(PSL\d+)\s+(.*)$/i);
    if (!match || Number(match[1].replace(/\D/g, '')) <= 5) return;
    const title = match[2].toLowerCase();
    if (title.includes('champion')) {
      const isCup = title.includes('cup');
      awards.push({
        category: isCup ? 'Cup' : 'League',
        label: text,
        image: isCup ? 'pslcup.png' : 'psltrophy.png',
        text,
      });
    } else if (title.includes('mvp')) {
      awards.push({category: 'MVPs', label: text, image: 'mvptrophy.png', text});
    } else if (title.includes('top scorer')) {
      awards.push({category: 'Top Scorers', label: text, image: 'topscorer.png', text});
    } else if (title.includes('rookie of the season')) {
      awards.push({category: 'ROTS', label: text, image: 'rots.png', text});
    }
  });

  (player.titles || [])
    .filter(text => /rookie of the season/i.test(text))
    .forEach(text => {
      if (awards.some(award => award.category === 'ROTS' && award.text === text)) return;
      awards.push({category: 'ROTS', label: text, image: 'rots.png', text});
    });

  const unique = new Map(awards.map(award => [`${award.category}:${award.text}`, award]));
  return Array.from(unique.values());
}

function getTeamSeasonRecords(team, season) {
  return historicalCompetitions
    .filter(competition => competition.name === season)
    .flatMap(competition => competition.placements
      .filter(placement => placement.team === team)
      .map(placement => ({competition, placement})));
}

function getTeamSeasonAwards(team, season, rosterPlayers) {
  const titles = [];
  const accolades = [];
  const rosterIds = new Set(rosterPlayers.map(player => player.id));
  getTeamSeasonRecords(team, season).forEach(({competition, placement}) => {
    getPlacementAwards(competition, placement).forEach(award => {
      (award.category === 'Cup' || award.category === 'League' ? titles : accolades).push({...award, text: award.label});
    });
  });

  historicalCompetitions
    .filter(competition => competition.name === season)
    .forEach(competition => {
      (competition.awards || [])
        .filter(award => rosterIds.has(award.player))
        .forEach(award => accolades.push({
          ...award,
          playerId: award.player,
          image: award.category === 'MVPs' ? 'mvptrophy.png' : 'topscorer.png',
          text: `${players.find(player => player.id === award.player)?.name || ''} · ${competition.name} ${award.label}`,
        }));
    });

  rosterPlayers.forEach(player => {
    (player.titles || [])
      .filter(text => text.toLowerCase().startsWith(`${season.toLowerCase()} `) && /rookie of the season/i.test(text))
      .forEach(text => accolades.push({
        category: 'ROTS',
        label: text,
        image: 'rots.png',
        text: `${player.name} · ${text}`,
        playerId: player.id,
      }));
  });

  return {titles, accolades};
}

function accoladeIconHTML(accolade, className) {
  return `<img class="${className || 'accolade-icon'}" src="logos/${accolade.image}" alt="${accolade.label}" title="${accolade.label}">`;
}

function awardCardHTML(award, text, className) {
  return `<div class="${className}">${accoladeIconHTML(award, 'accolade-icon')}<span>${text}</span></div>`;
}
