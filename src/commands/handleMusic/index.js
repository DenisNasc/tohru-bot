const ytdl = require('ytdl-core')

const musicState = {dispatcher: null, playlist: []}

const handleMusic = async (command, message, videoURL) => {
  switch (command) {
    case '!play': {
      const isInVoiceChanel = message.member.voice.channel

      if (isInVoiceChanel) {
        if (!videoURL) {
          message.reply(
            'veja se você não colocou 2 espaços entre o comando e a URL do vídeo, por favor :)'
          )
        }

        try {
          const connection = await message.member.voice.channel.join() // Bot entrando no canal de voz

          musicState.dispatcher = connection.play(ytdl(videoURL, {filter: 'audioonly'})) // Bot tocando a musica

          musicState.dispatcher.on('finish', () => {
            musicState.playlist.shift()
            message.reply('a música acabou, mestre :)')
          })
        } catch (err) {
          message.reply(`não consegui tocar a música. Esse foi o erro: ${err.message}`)
        }
      } else {
        message.reply('entre em um canal de voz primeiro')
      }

      return
    }

    case '!pause': {
      if (!musicState.dispatcher) return

      musicState.dispatcher.pause()
      message.reply('música pausada com sucesso!')
      return
    }

    case '!stop': {
      if (!musicState.dispatcher) return

      musicState.dispatcher.end()
      message.reply('música interrompida com sucesso!')
      return
    }

    case '!resume': {
      if (!musicState.dispatcher) return

      musicState.dispatcher.resume()
      message.reply('voltando a tocar a música')
      return
    }
    case '!skip': {
      return
    }

    case '!playlist': {
      message.reply(`Essa é a playlist atual: ${musicState.playlist}`)

      break
    }

    default: {
      // message.reply('digite um comando válido, mestre')
    }
  }
}

module.exports = handleMusic
