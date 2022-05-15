import renpy from '@/data/presetsKeywords/renpy'
import getRowType from '@/algorithms/analyse/getRowType'

export default function getCurrentLine (line1, line2, preset, mode) {
  const l1 = line1.trim()
  const l2 = line2.trim()
  const rowType = getRowType(l1, preset)
  // is it working?
  const startTabs = line1.match(/^[\s\uFEFF\xA0]+/g) ?? ''
  switch (preset) {
    case 'renpy':
      if (rowType !== 'speech') {
        return line1
      }
      if (mode === 'manual') {
        const lineMatch = l1.match(/^[a-zA-Z]+\s"/)
        if (lineMatch) {
          return startTabs + lineMatch + '"'
        } else if (l1.startsWith('"')) return startTabs + '""'
        else return line1
      } else {
        // code here for automatic mode
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
