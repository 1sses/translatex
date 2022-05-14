export default function removeComments (file, type) {
  switch (type) {
    case 'renpy':
      return file.filter(line => !line.text.trimStart().startsWith('#'))
    default:
      return file.filter(line => !line.text.trimStart().startsWith('//'))
  }
}
