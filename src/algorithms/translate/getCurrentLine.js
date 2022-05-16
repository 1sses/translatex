import renpy from '@/data/presetsKeywords/renpy'
import getRowType from '@/algorithms/analyse/getRowType'
import YandexAPI from '@/api/YandexAPI'
import { ElMessage } from 'element-plus'

export default function getCurrentLine (line1, line2, preset, mode, yandexState) {
  const l1 = line1.trim()
  const rowType = getRowType(l1, preset)
  const startTabs = line1.match(/^[\s\uFEFF\xA0]+/g) ?? ''
  switch (preset) {
    case 'renpy':
      if (rowType !== 'speech') {
        return line1
      }
      if (mode === 'Manual') {
        const lineMatch = l1.match(/^[a-zA-Z]+\s"/)
        if (lineMatch) {
          return startTabs + lineMatch + '"'
        } else if (l1.startsWith('"')) return startTabs + '""'
        else return line1
      }
      if (mode === 'AI') {
        const languages = `${yandexState.sourceLang}-${yandexState.targetLang}`
        YandexAPI.getTranslation(yandexState.key, l1, languages)
          .then(res => {
            if (res.code < 400) {
              ElMessage.success(res.text[0])
            } else {
              ElMessage.error(res.message)
            }
          })
          .catch(err => {
            console.log('ERROR IN UP', err)
            ElMessage.error(err)
          })
      }
      return line2
    default:
      if (mode === 'manual') {
        return line1
      } else {
        return line2
      }
  }
}
