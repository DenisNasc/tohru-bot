const filterAndFormatPlayerPositions = (telemetryFetchedData, playerName, mapSize) => {
  const filtredAndFormatedPlayerPositions = telemetryFetchedData
    .filter(e => {
      if (!e.character || !e.common) return false

      return (
        e.character.name === playerName && e._T === 'LogPlayerPosition' && e.common.isGame >= 0.1
      )
    })
    .map((e, i) => ({
      id: i,
      x: (e.character.location.x / mapSize).toFixed(2),
      y: (e.character.location.y / mapSize).toFixed(2),
      name: e.character.name,
      teamID: e.character.teamId,
      health: e.character.health
    }))

  return filtredAndFormatedPlayerPositions
}

module.exports = filterAndFormatPlayerPositions
