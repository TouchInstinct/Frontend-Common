import Query from 'qs'
import * as R from 'ramda'
import { sprintf } from 'sprintf-js'
import request from './request'
import HttpMethod from './HttpMethod'

class ApiMethodFactory {
  private readonly apiPrefix: string

  constructor(apiPrefix: string) {
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

  make = <R, T = null>(
    template: string,
    method: HttpMethod = HttpMethod.GET, {
      path: pathKeys = [],
      query: queryKeys = [],
    }: { path?: string[], query?: string[] } = {},
  ) => async (data: Nullable<T> = null): Promise<R> => {
    const getBody = R.pipe(
      R.ifElse(
        R.isNil,
        R.always(null),
        R.omit(R.concat(pathKeys, queryKeys)),
      ),
      R.when(R.isEmpty, R.always(null)),
      R.unless(R.isNil, JSON.stringify),
    )

    const body = getBody(data)
    const endpoint = this.makeEndpoint(template, data, pathKeys, queryKeys)

    return await request({
      method: method,
      url: endpoint,
      data: body,
    })
  }
}

export default ApiMethodFactory
