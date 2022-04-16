export default function getLocalstorageSize () {
  let totalLength = 0
  for (const property in localStorage) {
    if (!Object.prototype.hasOwnProperty.call(localStorage, property)) continue
    const propertyLength = ((localStorage[property].length + property.length) * 2)
    totalLength += propertyLength
  }
  return totalLength
}
