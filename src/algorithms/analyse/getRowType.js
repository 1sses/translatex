import renpy from '@/data/presetsKeywords/renpy'

export default function getRowType (row, preset) {
  const formattedRow = row.trim()
  switch (preset) {
    case 'renpy':
      if (formattedRow.startsWith('#')) return 'comment'
      if (renpy.includes(formattedRow.split(' ')[0]) || formattedRow.startsWith('$')) return 'system'
      if (/^[a-zA-Z]+\s"/.test(formattedRow) || formattedRow.startsWith('"')) return 'speech'
      return ''
    default:
      return ''
  }
}
