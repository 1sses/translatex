export default function checkWordsInLine (line1Arr, line2Arr) {
  let errorsCount = 0
  for (let i = 0; i < line1Arr.length; i++) {
    if (line1Arr[i] !== line2Arr[i]) {
      errorsCount++
    }
  }
  return errorsCount
}
