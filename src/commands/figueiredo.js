const db = require('../database/db-config')

const handleFigueiredo = async (message, type, cigarettes) => {
  switch (type) {
    case 'cigarros': {
      await db('figueiredo').insert({
        cigarettes: Number(cigarettes),
        date: new Date(),
        fiscal: message.author.id
      })

      let allCigarettes = await db('figueiredo').sum('cigarettes')
      allCigarettes = allCigarettes[0]['sum(`cigarettes`)']

      const messageSent = await message.channel.send(
        `Figueiredo ficou mais perto da morte ${cigarettes} vez(es) hoje. No total foram ${allCigarettes}. F`
      )
      await messageSent.react('🤦🏼‍♀️')

      break
    }
    default: {
      message.reply('o comando figueiredo não possui esse tipo')
      break
    }
  }
}

module.exports = handleFigueiredo
// >>figueiredo:cigarro 2
// >>figueiredo:rage
