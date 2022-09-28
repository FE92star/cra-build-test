import { lazyLoad } from './lazy'

import type { RouteConfig } from '.'

const PagesRoutes: RouteConfig[] = [
  {
    path: '/pages/Page1',
    meta: {
      title: 'Page1'
    },
    component: lazyLoad('Page1')
  },
  {
    path: '/pages/Page2',
    meta: {
      title: 'Page2'
    },
    component: lazyLoad('Page2')
  },
  {
    path: '/pages/Page3',
    meta: {
      title: 'Page3'
    },
    component: lazyLoad('Page3')
  },
  {
    path: '/pages/Page4',
    meta: {
      title: 'Page4'
    },
    component: lazyLoad('Page4')
  },
  {
    path: '/pages/Page5',
    meta: {
      title: 'Page5'
    },
    component: lazyLoad('Page5')
  },
  {
    path: '/pages/Page6',
    meta: {
      title: 'Page6'
    },
    component: lazyLoad('Page6')
  },
  {
    path: '/pages/Page7',
    meta: {
      title: 'Page7'
    },
    component: lazyLoad('Page7')
  },
  {
    path: '/pages/Page8',
    meta: {
      title: 'Page8'
    },
    component: lazyLoad('Page8')
  },
  {
    path: '/pages/Page9',
    meta: {
      title: 'Page9'
    },
    component: lazyLoad('Page9')
  },
  {
    path: '/pages/Page10',
    meta: {
      title: 'Page10'
    },
    component: lazyLoad('Page10')
  },
]

export default PagesRoutes
