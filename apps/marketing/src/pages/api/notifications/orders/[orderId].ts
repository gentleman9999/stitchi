import routes from '@lib/routes'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case 'GET': {
        const orderId = req.query.orderId

        if (typeof orderId !== 'string') {
          throw new Error('Invalid order ID')
        }

        res.redirect(301, routes.internal.closet.orders.show.href({ orderId }))
        break
      }

      default: {
        throw new Error(`Unsupported method "${req.method}"`)
      }
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error })
  }
}

export default handler
