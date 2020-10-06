const handleRenge = async (message, type) => {
  switch (type) {
    case 'nyanpasu': {
      const messageSent = await message.reply('nyanpasuuu >.<')
      messageSent.react('🙋🏼‍♀️')
      break
    }
    default: {
      message.reply('o comando renge não possui esse tipo')
      break
    }
  }
}

module.exports = handleRenge
