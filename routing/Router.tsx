import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { prepareRoutes } from './config'
import RouteDefinition from './Route'

const getComponentRoute = (contextPath: string, component: React.ComponentType) => (
  <Route
    exact
    key={contextPath}
    component={component}
    path={contextPath}
  />
)

const renderRouteConfig = (
  Container: React.ComponentType,
  routes: RouteDefinition[],
  contextPath: string,
): JSX.Element => {
  // Resolve route config object in React Router v3.
  const children: React.ReactNode[] = []
  console.log("start")

  const renderRoute = (item: RouteDefinition, routeContextPath: string) => {
    let newContextPath: string

    if (/(^\/)|(^\*)/.test(item.path)) {
      newContextPath = item.path
    } else {
      newContextPath = `${routeContextPath}/${item.path}`
    }
    //newContextPath = `${routeContextPath}/${item.path}`
    newContextPath = newContextPath.replace(/\/+/g, '/')
    console.log(newContextPath, item.name)

    if (item.redirect) {
      const route = (
        <Route
          exact
          key={newContextPath}
          render={() => <Redirect to={item.redirect as string} />}
          path={newContextPath}
        />
      )

      children.push(route)
    } else if (item.component && item.childRoutes) {
      console.log(item.name)
      const routeConfig = //renderRouteConfig(item.component, item.childRoutes, newContextPath)
      // (
      //   <Route
      //     path={newContextPath}
      //     >
      //     {renderRouteConfig(item.component, item.childRoutes, newContextPath)}
      //   </Route>
      // )

      children.push(routeConfig)
    } else if (item.component) {
      const route = getComponentRoute(newContextPath, item.component)

      children.push(route)
    } else if (item.childRoutes) {
      item.childRoutes.forEach(r => renderRoute(r, newContextPath))
    }
  }

  routes.forEach(item => renderRoute(item, contextPath))
  console.log("end", children.length)
  // Use Switch as the default container by default
  if (!Container) {
    return (
      <Switch>
        {children as JSX.TChildren[]}
      </Switch>
    )
  }
  console.log("mega end")
  return (
    <Container key={contextPath}>
      <Switch>
        {children as JSX.TChildren[]}
      </Switch>
    </Container>
  )
}

interface Props {
  routeConfig: RouteDefinition[]
  component: React.ComponentType
  baseUrlPath: string
}

const Router: React.FC<Props> = (props: Props) => {
  const { routeConfig, component, baseUrlPath } = props

  const preparedRoutes = prepareRoutes(routeConfig)
  console.log(preparedRoutes)
  //console.log("React",renderRouteConfig(component, preparedRoutes, baseUrlPath))

  return (
    <BrowserRouter>
      {renderRouteConfig(component, preparedRoutes, baseUrlPath)}
    </BrowserRouter>
  )
  //renderRouteConfig(component, preparedRoutes, baseUrlPath)
}

export default Router
