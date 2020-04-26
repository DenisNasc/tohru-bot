const translateMapName = mapCode => {
  console.log(mapCode)
  switch (mapCode.toLowerCase()) {
    case 'savage_main': {
      return 'Sanhok'
    }
    case 'erangel_main': {
      return 'Erangel'
    }
    case 'desert_main': {
      return 'Miramar'
    }
    case 'summerland_main': {
      return 'Karakin'
    }

    case 'baltic_main': {
      return 'Sanhok'
    }
  }
}

module.exports = translateMapName
