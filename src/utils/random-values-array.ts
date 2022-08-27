export function getExerciseOptions(array: any[], currentWord: string): any {
  const hash: any = {}
  for (let i = 0; i < array.length; i++) {
    const random = Math.floor(Math.random() * array.length)
    const item = array[random]
    if (hash[item.wordEnglish] || item.wordEnglish === currentWord) {
      i--
    } else {
      hash[item.wordEnglish] = item
    }

    if (Object.keys(hash).length === 3) break
  }

  return Object.keys(hash)
}
