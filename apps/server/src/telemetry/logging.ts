import pino from 'pino'
import { getOrThrow } from '../utils'

const logLevel = process.env.LOG_LEVEL || 'info'

const AXIOM_API_KEY = getOrThrow(process.env.AXIOM_API_KEY, 'AXIOM_API_KEY')
const AXIOM_DATASET = getOrThrow(process.env.AXIOM_DATASET_LOGGING, 'AXIOM_DATASET_LOGGING')

const localTransport = {
  level: logLevel,
  target: 'pino-pretty',
  options: {
    colorize: true,
  },
}

const axiomTransport = {
  level: logLevel,
  target: '@axiomhq/pino',
  options: {
    dataset: AXIOM_DATASET,
    token: AXIOM_API_KEY,
  },
}

export default pino({
  level: logLevel,
  transport: { targets: [localTransport, axiomTransport] },
}).child({
  'service.name': 'server',
  environment: getOrThrow(process.env.ENV, 'ENV'),
})

export type Logger = ReturnType<typeof pino>
