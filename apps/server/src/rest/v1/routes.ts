import { Router } from 'express'
import makeStripeRoutes from './stripe/routes'

interface Config {}

const makeRoutes = (config: Config = {}) => {
  const router = Router()

  router.get('/health', (req, res) => {
    res.send('OK')
  })

  router.use('/stripe', makeStripeRoutes())

  return router
}

export default makeRoutes
