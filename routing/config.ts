import * as R from 'ramda'
import Route from './Route'

// Handle isIndex property of route config:
// Duplicate it and put it as the first route rule.
const handleIndexRoute = (route: Route) => {
  if (!route.childRoutes || !route.childRoutes.length) {
    return
  }

  const indexRoute = route.childRoutes.find(R.prop('isIndex'))

  if (indexRoute) {
    const first = {
      ...indexRoute,
      path: route.path,
      exact: true,
    }

    route.childRoutes.unshift(first)
  }

  route.childRoutes.forEach(handleIndexRoute)
}

export const prepareRoutes: (route: Route[]) => Route[] = R.pipe(
  R.filter((r: Route): boolean => Boolean(
    r.redirect
      || r.component
      || (r.childRoutes && r.childRoutes.length > 0),
  )),
  R.forEach(handleIndexRoute),
)
