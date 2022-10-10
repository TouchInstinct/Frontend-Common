import axios, { AxiosRequestConfig } from 'axios'

import logger from '@lib/logger'
import { ApiError } from './error'

const retrieve = async (
  props: AxiosRequestConfig,
  hasRetriedAfterAuthentication = false,
): Promise<any> => {
  try {
    const { data } = await axios(props)

    return data
  } catch (err) {
    if (err?.hasAuthenticated && !hasRetriedAfterAuthentication) {
      return retrieve(props, true)
    }

    throw new ApiError(err)
  }
}

const request = (props: AxiosRequestConfig, { throwOnError = true } = {}) => {
  logger.debug(props, `throwOnError: ${throwOnError}`)

  return retrieve(props)
}

export default request
