import type { NextApiRequest, NextApiResponse } from 'next'
import { getImages, scrappage, scrappagNETFLIX, scrappImagesByFreepik } from '../../utils/scrapping'

export default (_req: NextApiRequest, res: NextApiResponse) => {
  res.json('Palabras')
}
