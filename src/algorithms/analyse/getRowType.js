import renpy from '@/data/presetsKeywords/renpy'

export default function getRowType (row, preset) {
  switch (preset) {
    case 'renpy':
      if (row.trimStart().startsWith('#')) return 'comment'
      if (renpy.includes(row.trimStart().split(' ')[0])) return 'keyword'
      return ''
    default:
      return ''
  }
}
