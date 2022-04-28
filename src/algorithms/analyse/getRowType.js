import renpy from '@/data/presetsKeywords/renpy'

export default function getRowType (row, preset) {
  const formattedRow = row.trimStart()
  switch (preset) {
    case 'renpy':
      if (formattedRow.startsWith('#')) return 'comment'
      if (renpy.includes(row.trimStart().split(' ')[0])) return 'keyword'
      if (/^[a-zA-Z]+\s"/.test(formattedRow) || formattedRow.startsWith('"')) return 'speech'
      return ''
    default:
      return ''
  }
}
