import express from 'express'
import makeV1Routes from './v1/routes'

interface ApiDependencies {}

const createApi = (app: express.Application, deps: ApiDependencies = {}) => {
  app.use('/api/v1', makeV1Routes())
}

export default createApi
