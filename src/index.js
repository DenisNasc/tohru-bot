require('dotenv').config({path: './src/.env'})

const Discord = require('discord.js')
const axiosConfig = require('./axios')
const client = new Discord.Client()
const {PREFIX, TOKEN, AUTHORIZATION} = process.env

const handleMusic = require('./commands/handleMusic')
const handlePUBG = require('./commands/handlePUBG')
const handleCSGO = require('./commands/handleCSGO')

const axios = axiosConfig(AUTHORIZATION)

client.login(TOKEN).then(() => require('./tasks')(client))

client.on('ready', () => {
  console.log(`${client.user.tag} pronta para o combate! :D`)
})

client.on('message', async message => {
  if (!message.guild) return

  const {content} = message
  const contentSplited = content.split(' ')
  const command = contentSplited[0].trim().toLowerCase()
  const isCommand = command.match(`${PREFIX}`)

  if (!isCommand) return

  let firstParam = ''
  let secondParam = 10

  if (contentSplited[1]) {
    firstParam = contentSplited[1].trim()
  }

  if (contentSplited[2]) {
    secondParam = contentSplited[2].trim()
  }

  handleMusic(command, message, firstParam)
  handlePUBG(command, message, axios, firstParam, secondParam)
  handleCSGO(command, message, Discord)
})

module.exports = client
