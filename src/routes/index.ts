import { lazyLoad, generateAppRouterNodes } from './lazy'
// import PagesRoutes from './page'

export interface RouteConfig {
  /** 路径 */
  path: string
  /** 组件URL */
  component?: any
  /** 元信息 */
  meta?: {
    title: string
  } & Record<string, any>
  /** 重定向,默认为首页 */
  redirect?: string
  /** 子路由 */
  children?: RouteConfig[]
}

const NotFoundAndIndex: RouteConfig[] = [
  {
    path: '*',
    meta: {
      title: '页面未找到'
    },
    component: lazyLoad('404')
  },
  {
    path: '/pages/Page1',
    meta: {
      title: 'Page1'
    },
    redirect: '/pages/Page1'
  },
]

export const Routes: RouteConfig[] = [
  ...NotFoundAndIndex,
  // ...PagesRoutes
]

const AppRouters = generateAppRouterNodes(Routes)

export default AppRouters
