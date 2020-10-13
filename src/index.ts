import path from 'path'
import dotenv from 'dotenv'
import Discord from 'discord.js'
import initializaMongoose from './database/mongoose'

// initialize dotenv
const pathToDotenv = path.resolve(process.cwd(), '.env')
dotenv.config({ path: pathToDotenv })
const { PREFIX, BOT_TOKEN, MONGO_ATLAS_URL } = process.env

// initialize mongoose
initializaMongoose(MONGO_ATLAS_URL || '').then(() =>
  console.log('MongoDB database connection established successfully')
)

// initialize discord.js
const client = new Discord.Client() // instância do bot

client.login(BOT_TOKEN)

client.on('ready', () => {
  console.log(`${client.user?.tag} em funcionamento`)
})

// handling wellcome message
client.on('guildMemberAdd', async member => {
  const username = member.user?.username
  const id = member.user?.id

  try {
    const handleGuildMemberAdd = (await import('./events/handleGuildMemberAdd')).default
    await handleGuildMemberAdd(username || '')
    const pathToWellcomeImage = path.join(process.cwd(), 'src/assets/img/edited.jpeg')
    const wellcomeMessage = new Discord.MessageAttachment(pathToWellcomeImage)

    const discordGuild = new Discord.Guild(client, {})
    const wellcomeChannel = new Discord.TextChannel(discordGuild, { id: '704188994925363283' })

    await wellcomeChannel.send(`<@${id}>`)
    await wellcomeChannel.send(wellcomeMessage)
  } catch (error) {
    console.error(error.message)
  }
})

// handling messages event without commands (truggers)
client.on('message', async message => {
  if (!message.guild) return
  if (message.author.bot) return

  const { content } = message
  const handleTriggers = (await import('./triggers/handleTriggers')).default

  const especialMessage = handleTriggers(content.trim().toLowerCase())

  if (!especialMessage) return

  await (await message.channel.send(especialMessage.answer)).react(especialMessage.emoji)
})

const handleMessage = (content: string): { command: string | null; params: string[] } => {
  const contentSplited = content.split(' ')

  const [possibleCommand, ...params] = contentSplited

  const commandArr = possibleCommand
    .trim()
    .toLowerCase()
    .match(/^\$(.*)/)

  if (!commandArr) {
    const command = null
    return { command, params }
  }

  const command = commandArr[1].trim().toLowerCase()

  return { command, params }
}

// handling messages event with commands
client.on('message', async message => {
  if (!message.guild) return
  if (message.author.bot) return

  const { content } = message

  const { command, params } = handleMessage(content)

  if (!command) return

  try {
    switch (command) {
      case 'pegou': {
        const handlePegou = (await import('./commands/pegou')).default

        const messageAuthor = message.author
        const messageCatched = await handlePegou(messageAuthor, params)
        ;(await message.channel.send(messageCatched)).react('👬')

        break
      }

      case 'regua': {
        const handleRegua = (await import('./commands/regua')).default
        const { message: messageRegua, emoji } = handleRegua()

        const _ = (await message.reply(messageRegua)).react(emoji)

        break
      }

      default: {
        await message.reply('comando não encontrado')
      }
    }
  } catch (error) {
    console.error(error.message)
  }
})

module.exports = client
