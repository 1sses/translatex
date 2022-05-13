export default function getDuplicatedParts (file) {
  const duplicatedParts = []
  for (let i = 0; i < file.length; i++) {
    for (let j = i + 1; j < file.length; j++) {
      if (file[i] === file[j] && file[i + 1] === file[j + 1]) {
        console.log('duplicate fragment!')
        console.log(file[i], i)
        console.log(file[j], j)
      }
    }
  }
  return duplicatedParts
}
