import { User } from 'discord.js'
import UserModel from '../database/models/user'

const handlePegou = async (messageAuthor: User, params: string[]) => {
  const { id: discordID, username } = messageAuthor

  if (params.length > 0) return `${params[0]} pegou na do ${username} iiiih kkkkj`

  try {
    const document = await UserModel.findOne({ discordID })

    if (!document) {
      await UserModel.create({ discordID, username })
      return 1
    }

    if (typeof document.catched !== 'number') return

    await UserModel.updateOne({ discordID }, { catched: document.catched + 1 })

    return `${messageAuthor.username} pegou ${document.catched + 1} vezes na minha iiiiih`
  } catch (error) {
    return `error: ${error.message}`
  }
}

export default handlePegou
