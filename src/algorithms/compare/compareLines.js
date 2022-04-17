export default function compareLines (line1, line2) {
  let status = 'success'
  const l1 = line1.trim()
  const l2 = line2.trim()
  if (l1.length !== l2.length || l1 !== l2) {
    status = 'exception'
  }
  return {
    status
  }
}
