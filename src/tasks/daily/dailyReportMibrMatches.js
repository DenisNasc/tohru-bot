const upcomingMibrMatches = require('../../commands/handleCSGO/utils/upcomingMibrMatches')

const dailyReportMibrMatches = async client => {
  const mibrMatchesReport = await upcomingMibrMatches()
  const channelGeral = await client.channels.fetch(process.env.CHANNEL_GERAL_ID)

  channelGeral.send({embed: mibrMatchesReport})
}

module.exports = dailyReportMibrMatches
