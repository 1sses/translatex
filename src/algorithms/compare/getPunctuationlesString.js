export default function getPunctuationLessString (string) {
  const resulted1 = string.replace(/[!"#$%&\\()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, ' ')
  return resulted1.replace(/\s{2,}/g, ' ')
}
