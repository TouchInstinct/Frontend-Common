import axios, { AxiosRequestConfig } from 'axios'

import logger from 'lib/logger'

const retrieve = async (
  props: AxiosRequestConfig,
  hasRetriedAfterAuthentication = false,
): Promise<any> => {
  try {
    console.log(props);
    
    const { data } = await axios(props)

    return data
  } catch (err) {
    if (err?.hasAuthenticated && !hasRetriedAfterAuthentication) {
      return retrieve(props, true)
    }

    throw new Error(err)
  }
}

const request = (props: AxiosRequestConfig, { throwOnError = true } = {}) => {
  logger.debug(props, `throwOnError: ${throwOnError}`)

  return retrieve(props)
}

export default request
