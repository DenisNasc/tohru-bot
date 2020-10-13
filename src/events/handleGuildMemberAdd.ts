import path from 'path'
import fs from 'fs'
import { createCanvas, loadImage } from 'canvas'

const pathToImgDir = path.join(process.cwd(), 'src/assets/img')

const handleGuildMemberAdd = async (username: string) => {
  const width = 700
  const height = 500

  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  try {
    const wellcomeImage = await loadImage(`${pathToImgDir}/wellcome.jpeg`)
    ctx.drawImage(wellcomeImage, 0, 0, 700, 500)

    ctx.fillStyle = '#fff'
    ctx.fillRect(150, 30, 90, 60)

    ctx.font = '30px Arial'
    ctx.fillStyle = '#3574d4'
    ctx.fillText('vindO', 155, 70, 90)

    ctx.fillStyle = '#fff'
    ctx.fillRect(450, 350, 200, 60)

    ctx.font = 'bold 30px Arial'
    ctx.fillStyle = '#3574d4'
    ctx.fillText(username, 500, 390)

    const buffer = canvas.toBuffer('image/jpeg')
    fs.writeFileSync(`${pathToImgDir}/edited.jpeg`, buffer)
  } catch (error) {
    console.log(error.message)
  }
}

export default handleGuildMemberAdd
