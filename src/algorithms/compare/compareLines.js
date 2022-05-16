import getPunctuationLessString from '@/algorithms/compare/getPunctuationlesString'
import checkWordsInLine from '@/algorithms/compare/checkWordsInLine'

export default function compareLines (line1, line2) {
  let status = 'success'
  const helper = []
  const l1 = line1.trim()
  const l2 = line2.trim()
  if (l1.length !== l2.length || l1 !== l2) {
    status = 'warning'
    const l1pLess = getPunctuationLessString(l1)
    const l2pLess = getPunctuationLessString(l2)
    if (l1pLess !== l2pLess) {
      helper.push('Different words')
      const l1pLessArr = l1pLess.split(' ')
      const l2pLessArr = l2pLess.split(' ')
      if (l1pLessArr.length !== l2pLessArr.length) {
        status = 'exception'
        helper.push('Different words count in lines')
      } else {
        const incompatibleWords = checkWordsInLine(l1pLessArr, l2pLessArr)
        if (incompatibleWords > 3) status = 'exception'
        helper.push(`Different words in line: ${incompatibleWords}`)
      }
    } else {
      helper.push('Different punctuation')
    }
  }
  return {
    status,
    helper: helper.join(', ')
  }
}
