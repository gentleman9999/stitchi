import pino from 'pino'

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
})
