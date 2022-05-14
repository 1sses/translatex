export default function getDuplicatedParts (file) {
  const duplicatedParts = []
  for (let i = 0; i < file.length;) {
    const secondaryLengths = [1]
    for (let j = i + 1; j < file.length; j++) {
      if (file[i].text === file[j].text && file[i + 1].text === file[j + 1].text) {
        const index1 = file[i].line
        const index2 = file[j].line
        let length = 0
        while (file[i + length].text === file[j].text) {
          length++
          j++
        }
        duplicatedParts.push({
          index1,
          index2,
          length,
          lines: file.slice(i, i + length).map(part => part.text)
        })
        secondaryLengths.push(length)
      }
    }
    i += Math.max(...secondaryLengths)
  }
  return duplicatedParts
}
