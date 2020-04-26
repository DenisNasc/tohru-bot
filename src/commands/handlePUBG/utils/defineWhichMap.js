const path = require('path')
const {loadImage} = require('canvas')

const entryPath = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV ? 'src' : 'build'
console.log(process.env.NODE_ENV, entryPath)
const defineWhichMap = async mapName => {
  switch (mapName) {
    case 'Erangel': {
      const mapImage = await loadImage(path.resolve(entryPath, 'assets', 'pubg', 'erangel.png'))
      const mapSize = 816

      return {mapSize, mapImage}
    }

    case 'Miramar': {
      const mapImage = await loadImage(path.resolve(entryPath, 'assets', 'pubg', 'miramar.png'))
      const mapSize = 816
      return {mapSize, mapImage}
    }

    case 'Sanhok': {
      const mapImage = await loadImage(path.resolve(entryPath, 'assets', 'pubg', 'sanhok.png'))
      const mapSize = 408
      return {mapSize, mapImage}
    }

    default: {
    }
  }
}
module.exports = defineWhichMap
