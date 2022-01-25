import Query from 'qs'
import * as R from 'ramda'
import { sprintf } from 'sprintf-js'
import request from './request'
import HttpMethod from './HttpMethod'
import HeadersType from './TypeHeader'

class ApiMethodFactory {
  private readonly apiPrefix: string

  constructor({ apiPrefix }: { apiPrefix: string }) {
    this.apiPrefix = apiPrefix
  }

  private makePath = <T>(data: T, pathKeys: string[]) => (template: string): string => {
    const prefixedTemplate = `${this.apiPrefix}${template}`

    if (R.isEmpty(pathKeys)) {
      return prefixedTemplate
    }

    const pathData = R.pick(pathKeys, data)

    if (R.isEmpty(pathData)) {
      throw Error('api: empty path data')
    }

    return sprintf(prefixedTemplate, pathData)
  }

  private makeEndpoint = <T>(
    template: string,
    data: T,
    pathKeys: string[],
    queryKeys: string[],
  ): string => {
    const make = R.compose(
      this.addQuery(data, queryKeys),
      this.makePath(data, pathKeys),
    )

    return make(template)
  }

  private addQuery = <T>(data: T, queryKeys: string[]) => (path: string): string => {
    if (R.isEmpty(queryKeys)) {
      return path
    }

    const queryData = R.pick(queryKeys, data)

    if (R.isEmpty(queryData)) {
      throw Error('api: empty query data')
    }

    const query = Query.stringify(queryData)

    return `${path}?${query}`
  }

  make = <R = any, T = any>(
    template: string,
    method: HttpMethod = HttpMethod.GET, {
      path: pathKeys = [],
      query: queryKeys = [],
      isFormData = false,
    }: { path?: string[], query?: string[], isFormData?: boolean } = {},
  ) => async (data: Nullable<T> = null, headers: HeadersType = {}): Promise<R> => {
    const getBody = (body: Nullable<T>) => {
      if (R.isNil(body) || body instanceof FormData) {
        return body
      }

      const preResult = R.pipe(
        R.omit(R.concat(pathKeys, queryKeys)),
        R.when(R.isEmpty, R.always(null)),
      )(body)

      if (isFormData) {
        const formData = new FormData()

        R.forEachObjIndexed<any>((value, key) => formData.append(key as string, value), body)

        return formData
      }

      return preResult
    }

    const body = getBody(data)
    const endpoint = this.makeEndpoint(template, data, pathKeys, queryKeys)

    return await request({
      method: method,
      url: endpoint,
      data: body,
      headers: headers,
    })
  }
}

export default ApiMethodFactory
