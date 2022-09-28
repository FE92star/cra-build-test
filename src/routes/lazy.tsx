import React, { lazy } from 'react'
import { Route, Navigate } from 'react-router-dom'

import type { RouteConfig } from '.'

export const lazyLoad = (moduleName: string) => {
  const Module = lazy(() => import(`@/pages/${moduleName}`))

  return <Module />
}

export function generateAppRouterNodes(routes: RouteConfig[]) {
  if (!routes.length) {
    console.error('请传入路由列表')
    return
  }

  const generateRouterNode = (route: RouteConfig) => {
    // 处理子路由列表
    if (route.children) {
      return (
        <React.Fragment key={route.path}>
          <Route path={route.path} element={route.component}>
            {
              route.children.map(item => generateRouterNode(item))
            }
          </Route>
        </React.Fragment>
      )
    }
    const RouteComponent = route.redirect
      ? <Route index element={<Navigate to={route.redirect} />} key={route.path} />
      : <Route path={route.path} element={route.component} key={route.path} />

    return RouteComponent
  }

  const RouterList = routes.map(route => generateRouterNode(route))

  return RouterList
}
