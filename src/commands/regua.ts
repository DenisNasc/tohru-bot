const handleRegua = () => {
  const regua = 30 * Math.random()

  if (regua <= 10) {
    return { message: `K K K K J só ${regua.toFixed(2)}cm na régua`, emoji: '😂' }
  } else if (regua > 10 && regua < 20) {
    return { message: `${regua.toFixed(2)}cm na régua não tem nem graça`, emoji: '😪' }
  } else {
    return { message: `:O ${regua.toFixed(2)}cm na régua é um comedor de casadas`, emoji: '🍌' }
  }
}

export default handleRegua
