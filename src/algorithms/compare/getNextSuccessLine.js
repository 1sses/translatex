export default function getNextSuccessLine (index, file1, file2) {
  let successLineIndex = 0
  for (let i = index; i < file1.length; i++) {
    if (file1[i] !== file2[i]) {
      successLineIndex++
    } else {
      return successLineIndex
    }
  }
  return Infinity
}
