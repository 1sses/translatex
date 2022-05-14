export default function getDuplicatedParts (file) {
  // make array of all duplicated parts
  const duplicatedParts = []
  for (let i = 0; i < file.length;) {
    const secondaryLengths = [1]
    for (let j = i + 1; j < file.length - 1; j++) {
      if (file[i].text === file[j].text && file[i + 1].text === file[j + 1].text) {
        const index1 = file[i].line
        const index2 = file[j].line
        let length = 0
        while (file[i + length] && file[j] && file[i + length].text === file[j].text) {
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
  console.log(duplicatedParts.length)

  // collapse duplicated parts
  const collapsedDuplicatedParts = []
  for (let i = 0; i < duplicatedParts.length; i++) {
    collapsedDuplicatedParts.push({
      indexes: [
        {
          1: duplicatedParts[i].index1,
          2: duplicatedParts[i].index2
        }
      ],
      lines: duplicatedParts[i].lines
    })
    for (let j = i + 1; j < duplicatedParts.length; j++) {
      if (duplicatedParts[i].lines.toString() === duplicatedParts[j].lines.toString()) {
        collapsedDuplicatedParts.at(-1).indexes.push({
          1: duplicatedParts[j].index1,
          2: duplicatedParts[j].index2
        })
        duplicatedParts.splice(j, 1)
        j--
      }
    }
  }

  return collapsedDuplicatedParts
}
