import loglevel from 'loglevel'

const logger = loglevel.getLogger('default')

logger.setLevel(process.env.NODE_ENV === 'production' ? 'WARN' : 'DEBUG')

export const pipelog = (...args: unknown[]) => (value: unknown) => {
  logger.debug(...args, value)

  return value
}

export default logger
