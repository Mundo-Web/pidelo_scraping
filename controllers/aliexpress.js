import Response from "../models/Response.js";
import { ALIEXPRESS_URL } from "../utils/settings.js";

class AliExpressController {

  static search = async (req, res) => {
    const { query, page } = req.query
    const response = new Response()
    try {
      const body = {
        target: "root",
        data: {
          g: "n",
          SearchText: query,
          origin: "y",
          page,
        },
        eventName: "onChange",
        dependency: []
      }

      const res = await fetch(`${ALIEXPRESS_URL}/fn/search-pc/index`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cookie': 'aep_usuc_f=site=esp&c_tp=PEN&region=PE&b_locale=es_ES&ae_u_p_s=2'
        },
        body: JSON.stringify(body)
      })

      if (!res.ok) throw new Error('Ocurrio un error al buscar los items')

      const data = await res.json()
      if (!data.success) throw new Error(data.errorMessage)

      const items = []
      data?.data?.result?.mods?.itemList?.content?.forEach(item => {
        console.log(JSON.stringify(item) + '\n')
        items.push({
          code: item.productId,
          images: item.images ? item.images.map(x => x.imgUrl) : [item.image.imgUrl],
          price: item.prices.salePrice.minPrice,
          currency: item.prices.salePrice.currencyCode,
          name: item.title.displayTitle
        })
      })

      response.status = 200
      response.message = 'Correcto'
      response.data = {
        items,
        currentPage: data?.data?.result?.pageInfo?.page ?? 1,
        pages: data?.data?.result?.pageInfo?.pageSize ?? 1,
        total: data?.data?.result?.pageInfo?.totalResults ?? 0
      }
    } catch (error) {
      response.status = 400
      response.message = error.message
    } finally {
      res.status(response.status)
      res.json(response)
    }
  }
  static details = async (req, res) => {

  }
}

export default AliExpressController;