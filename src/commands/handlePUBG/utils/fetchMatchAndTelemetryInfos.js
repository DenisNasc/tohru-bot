const fetchMatchAndTelemetryInfos = async (axios, playerName) => {
  const {data: playerFetchedData} = await axios.get(`/players?filter[playerNames]=${playerName}`)

  const {id: matchID} = playerFetchedData.data[0].relationships.matches.data[0]

  const {data: matchFetchedData} = await axios.get(`/matches/${matchID}`)

  const {included} = matchFetchedData

  const telemetryMatchID = matchFetchedData.data.relationships.assets.data[0].id

  const telemetryMatchInfos = included.filter(e => e.id === telemetryMatchID && e.type === 'asset')

  const {URL: telemetryURL} = telemetryMatchInfos[0].attributes

  const {data: telemetryFetchedData} = await axios.get(telemetryURL)

  return {matchFetchedData, telemetryFetchedData}
}

module.exports = fetchMatchAndTelemetryInfos
