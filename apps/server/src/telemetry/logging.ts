import pino from 'pino'
import { getOrThrow } from '../utils'

const logLevel = process.env.LOG_LEVEL || 'info'

const localTransport = {
  target: 'pino-pretty',
  options: {
    colorize: true,
  },
}

export default pino({
  level: logLevel,
  transport: localTransport,
}).child({
  'service.name': 'server',
  environment: getOrThrow(process.env.ENV, 'ENV'),
})

export type Logger = ReturnType<typeof pino>
