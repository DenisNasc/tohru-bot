require('dotenv').config({path: './.env'})
const Discord = require('discord.js')

const {PREFIX, BOT_TOKEN} = process.env

const client = new Discord.Client()

client.login(BOT_TOKEN).then(() => console.log('BOT EM FUNCIONAMENTO!!!'))

client.on('ready', () => {
  console.log(`${client.user.tag} pronta para o combate! :D`)
})

client.on('message', async message => {
  if (!message.guild) return

  const {content} = message
  const contentSplited = content.split(':')
  let command = contentSplited[0].trim().toLowerCase()

  const isCommand = command.match(`${PREFIX}`)

  if (!isCommand) return

  command = command.replace(PREFIX, '')

  const [type, ...params] = contentSplited[1].split(' ')

  switch (command) {
    case 'renge': {
      require('./commands/renge')(message, type)

      break
    }
    case 'figueiredo': {
      require('./commands/figueiredo')(message, type, params[0] || 1)
      break
    }
    default: {
      message.reply('comando não encontrado')
    }
  }
})

module.exports = client
