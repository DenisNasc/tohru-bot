const upcomingMibrMatches = require('./utils/upcomingMibrMatches')

const handleCSGO = async (command, message) => {
  switch (command) {
    case '!mibr': {
      const mibrMatchesReport = await upcomingMibrMatches(message)
      message.channel.send({embed: mibrMatchesReport})

      break
    }
    default: {
      break
    }
  }
}

module.exports = handleCSGO
