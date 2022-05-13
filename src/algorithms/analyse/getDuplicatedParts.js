export default function getDuplicatedParts (file) {
  const duplicatedParts = []
  for (let i = 0; i < file.length;) {
    const secondaryLengths = [1]
    for (let j = i + 1; j < file.length; j++) {
      if (file[i] === file[j] && file[i + 1] === file[j + 1]) {
        const index1 = i + 1
        const index2 = j + 1
        let length = 0
        while (file[i + length] === file[j]) {
          length++
          j++
        }
        duplicatedParts.push({
          index1,
          index2,
          length,
          lines: file.slice(i, i + length)
        })
        secondaryLengths.push(length)
      }
    }
    i += Math.max(...secondaryLengths)
  }
  console.log('END', duplicatedParts)
  return duplicatedParts
}
