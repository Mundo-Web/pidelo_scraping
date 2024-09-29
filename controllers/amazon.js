import Browser from "../utils/browser.js";
import { AMAZON_URL, AMAZON_URL_QUERY } from "../utils/settings.js";

class AmazonController {
  static getCategories = async (req, res) => {
    const { browser, page } = await Browser.page()
    await page.goto(AMAZON_URL)
    const categories = await page.evaluate(() => {
      const categories = []
      document.querySelectorAll('.a-cardui').forEach((e) => {
        const category = e.children[0].textContent
        categories.push({
          category
        })
      })
      return categories
    })
    // await browser.close()
    res.json(categories)
  }

  static getProducts = async (req, res) => {
    const { query, page: pagination } = req.query

    const { browser, page } = await Browser.page()

    await page.goto(AMAZON_URL_QUERY
      .replace('{query}', query)
    .replace('{page}', pagination ?? 1))

    const results = await page.evaluate(() => {
      const results = []
      document.querySelectorAll('[data-asin][data-uuid]').forEach(e => {
        const code = e.getAttribute('data-asin')
        if (!code) return
        const uuid = e.getAttribute('data-uuid')
        const img = e.querySelector('.s-image').src
        const name = e.querySelector('[data-cy="title-recipe"] h2').textContent
        const price = e.querySelector('.a-price-whole')?.textContent
        const fraction = e.querySelector('.a-price-fraction')?.textContent
        if (!price) return
        results.push({
          code, uuid, img, name,
          price: Number(`${price}${fraction}`)
        })
      })
      return results
    })

    await browser.close()
    res.json(results)
  }
}

export default AmazonController;