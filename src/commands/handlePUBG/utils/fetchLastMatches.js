const fetchLastMatches = async (axios, playerName, numberOfMatches = 10) => {
  const {data: playerFetchedData} = await axios.get(`/players?filter[playerNames]=${playerName}`)

  const lastMatches = playerFetchedData.data[0].relationships.matches.data

  const lastTenMatches = lastMatches.filter((e, i) => i < numberOfMatches)

  const lastTenMatchesFormated = await lastTenMatches.map(async matchInfos => {
    const {data} = await axios.get(`/matches/${matchInfos.id}`)

    const generalStatusMatch = {
      duration: data.data.attributes.duration,
      gameMode: data.data.attributes.gameMode
    }

    const playerStatsInThisMatch = data.included.filter(playerStats => {
      if (!playerStats.attributes.stats || !playerStats.attributes || !playerStats) {
        return false
      }

      return playerStats.attributes.stats.name === playerName
    })

    const playerStatsInThisMatchFormated = {
      name: playerStatsInThisMatch[0].attributes.stats.name,
      winPlace: playerStatsInThisMatch[0].attributes.stats.winPlace,
      kills: playerStatsInThisMatch[0].attributes.stats.kills
    }

    return {
      ...generalStatusMatch,
      ...playerStatsInThisMatchFormated
    }
  })

  const lastTenMatchesFormatedandResolved = await Promise.all(lastTenMatchesFormated)

  return lastTenMatchesFormatedandResolved
}

module.exports = fetchLastMatches
