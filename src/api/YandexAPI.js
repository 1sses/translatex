export default class YandexAPI {
  static async getTranslation (key, text, lang) {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${text}&lang=${lang}`
    const response = await fetch(url)
    const data = await response.json()
    return data.text[0]
  }
}
