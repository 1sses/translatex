import presets from '@/data/presets'
import renpy from '@/data/presetsKeywords/renpy'

export default function getAssumedFileType (file) {
  const presetsKeywords = { renpy }
  const presetMap = Object.fromEntries(Object.entries(presets).map(([key]) => [key, 0]))
  delete presetMap.none

  for (const line of file) {
    const firstWord = line.trimStart().split(' ')[0]
    for (const key in presetsKeywords) {
      if (presetsKeywords[key].includes(firstWord)) {
        presetMap[key]++
      }
    }
  }
  const max = Math.max(...Object.values(presetMap))
  if (!max) {
    return ''
  }
  return Object.keys(presetMap).find(key => presetMap[key] === max)
}
