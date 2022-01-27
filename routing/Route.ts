import React from 'react'

interface Route {
  path: string
  name?: string
  redirect?: string
  exact?: boolean
  navbar?: boolean
  isIndex?: boolean
  icon?: React.ComponentType
  childRoutes?: Route[]
  component?: React.ComponentType
  getUrl?: (params: Record<string, unknown>) => string
}

export default Route
