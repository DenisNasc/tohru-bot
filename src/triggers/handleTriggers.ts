const handleTriggers = (content: string) => {
  if (content.includes('iii')) {
    return { answer: 'iiiiiih', emoji: '🏳️‍🌈' }
  }
  if (content.includes('kkkkk') || content.includes('hahaha') || content.includes('uash')) {
    return { answer: 'kkkkkkkkj', emoji: '🤣' }
  }
  if (content.trim().toLowerCase() === 'oi') {
    return { answer: 'olá, lindinho(a)', emoji: '✨' }
  }

  return false
}

export default handleTriggers
