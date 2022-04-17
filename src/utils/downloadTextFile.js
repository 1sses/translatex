export default function downloadTextFile (filename, data) {
  const a = document.createElement('a')
  const file = new Blob([data], { type: 'text/plain' })
  a.href = URL.createObjectURL(file)
  a.download = filename
  a.click()
}
