const Discord = require('discord.js')
const {HLTV} = require('hltv')

const upcomingMibrMatches = async () => {
  const matches = await HLTV.getMatches()
  const mibrMatches = matches.filter(match => {
    if (!match.team1 || !match.team2) return false
    return match.team1.name.toLowerCase() === 'mibr' || match.team2.name.toLowerCase() === 'mibr'
  })

  const mibrMatchesFormated = mibrMatches.map(match => {
    return {
      message: `${match.team1.name} x ${match.team2.name} - ${match.event.name}`,
      matchID: match.id,
      match
    }
  })

  const embedMessage = new Discord.MessageEmbed()

  embedMessage.setAuthor('MIBR upcoming matches')
  embedMessage.setColor('RANDOM')

  mibrMatchesFormated.forEach(async e => {
    const mibrMatchDate = new Date(e.match.date)

    const day = mibrMatchDate.getDate()
    const mounth = mibrMatchDate.getMonth()
    const year = mibrMatchDate.getFullYear()

    const hours = mibrMatchDate.getHours()
    const minutes = mibrMatchDate.getMinutes()

    embedMessage.addField(`${day}/${mounth}/${year} [${hours}:${minutes}]`, e.message)
  })

  return embedMessage
}

module.exports = upcomingMibrMatches
