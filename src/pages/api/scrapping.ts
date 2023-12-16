import type { NextApiRequest, NextApiResponse } from 'next'
import { getImages, scrappage, scrappagNETFLIX, scrappImagesByFreepik } from '../../utils/scrapping'

type Data = {
  name: string
}

export default (_req: NextApiRequest, res: NextApiResponse<Data>) => {
  // scrappage()
  // scrappImagesByFreepik()
  // getImages()
  scrappagNETFLIX()

  res.status(200).json({ name: 'John Doe images' })
}
