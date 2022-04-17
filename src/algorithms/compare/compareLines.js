import getPunctuationLessString from '@/algorithms/compare/getPunctuationlesString'

export default function compareLines (line1, line2) {
  let status = 'success'
  const helper = ''
  const l1 = line1.trim()
  const l2 = line2.trim()
  if (l1.length !== l2.length || l1 !== l2) {
    status = 'warning'
    const l1pLess = getPunctuationLessString(l1)
    const l2pLess = getPunctuationLessString(l2)
    console.log(l1pLess, l2pLess)
  }
  return {
    status,
    helper
  }
}
