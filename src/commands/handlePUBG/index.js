const handlePUBG = async (command, message, axios, playerName, ...more) => {
  switch (command) {
    case '!matches': {
      try {
        const numberOfMatches = more[0]

        const lastMatches = await require('./utils/fetchLastMatches')(
          axios,
          playerName,
          numberOfMatches
        )

        const totalKills = lastMatches.reduce((acumulado, e) => acumulado + e.kills, 0)
        const sumPositions = lastMatches.reduce((acumulado, e) => acumulado + e.winPlace, 0)
        const sumDuration = lastMatches.reduce((acumulado, e) => acumulado + e.duration, 0)

        message.reply(
          `resumo das últimas ${numberOfMatches} partidas de ${playerName}   --->   Média de kills: ${(
            totalKills / numberOfMatches
          ).toFixed(2)} | Posição média: ${(sumPositions / numberOfMatches).toFixed(
            0
          )} | Duração total média das partidas: ${(sumDuration / (numberOfMatches * 60)).toFixed(
            0
          )} min e ${(
            ((sumDuration % (numberOfMatches * 60)) / (60 * numberOfMatches)) *
            60
          ).toFixed()} seg`
        )
      } catch (err) {
        console.log(err.message)
      }

      break
    }

    case '!kills': {
      try {
        message.reply('estou processando os dados. . .')

        const fetchMatchAndTelemetryInfos = require('./utils/fetchMatchAndTelemetryInfos')
        const {matchFetchedData, telemetryFetchedData} = await fetchMatchAndTelemetryInfos(
          axios,
          playerName
        )

        const translateMapName = require('./utils/translateMapName')
        const mapName = translateMapName(matchFetchedData.data.attributes.mapName.toLowerCase())

        const whenMatchStarted = new Date(telemetryFetchedData[0]._D)

        const matchInfos = {
          date: {
            day: whenMatchStarted.getDate(),
            mounth: whenMatchStarted.getMonth() + 1,
            year: whenMatchStarted.getFullYear(),
            hour: whenMatchStarted.getHours(),
            minute: whenMatchStarted.getMinutes()
          }
        }

        const allKillsOfThisPlayer = telemetryFetchedData.filter(e => {
          if (!e.killer) return false
          return e._T === 'LogPlayerKill' && e.killer.name === playerName
        })

        const playersKilledByThisPlayer = allKillsOfThisPlayer.map(e => e.victim.name)

        message.reply(
          `o jogador ${playerName} obteve um total de: ${
            playersKilledByThisPlayer.length
          } kills [${playersKilledByThisPlayer.toString().replace(/,/g, ' - ')}] - ${mapName}: ${
            matchInfos.date.day
          }/${matchInfos.date.mounth}/${matchInfos.date.year} `
        )
      } catch (err) {
        console.log(err.message)
      }

      break
    }

    case '!route': {
      try {
        await message.channel.send('Estou criando o mapa. Isso pode demorar um pouco.')

        const {createCanvas} = require('canvas')
        const fetchMatchAndTelemetryInfos = require('./utils/fetchMatchAndTelemetryInfos')

        const {matchFetchedData, telemetryFetchedData} = await fetchMatchAndTelemetryInfos(
          axios,
          playerName
        )

        const translateMapName = require('./utils/translateMapName')
        const mapName = translateMapName(matchFetchedData.data.attributes.mapName)

        if (!mapName || mapName === 'Karakin') {
          await message.reply('ainda não configurei Karakin')
          break
        }

        const {mapImage, mapSize} = await require('./utils/defineWhichMap')(mapName)

        const routeOfThisPlayer = require('./utils/filterAndFormatPlayerPositions')(
          telemetryFetchedData,
          playerName,
          mapSize
        )

        const canvas = createCanvas(1000, 1000)
        const context = canvas.getContext('2d')

        context.drawImage(mapImage, 0, 0, canvas.width, canvas.height)

        context.strokeStyle = 'rgb(255,0,0)'
        context.lineWidth = 1

        context.beginPath()

        routeOfThisPlayer.forEach(e => {
          context.lineTo(e.x, e.y)
        })

        context.stroke()

        const Discord = require('discord.js')
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'A sua rota')

        await message.channel.send('A sua rota', attachment)
        await message.reply(
          `pronto, ai esta a rota que o jogador ${playerName} fez na sua última partida :D`
        )
      } catch (err) {
        await message.reply(
          `Algo de errado aconteceu :(. Essa é a mensagem de erro: ${err.message}`
        )
      }

      break
    }

    default: {
    }
  }
}

module.exports = handlePUBG
