import React, { Suspense, lazy } from "react"
import { Routes, Route, Outlet, Navigate } from "react-router-dom"

import RoutesList from './routes'
import { generateAppRouterNodes } from './routes/lazy'

const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

const Page1 = lazy(() => import('./pages/Page1'))
const Page2 = lazy(() => import('./pages/Page2'))
const Page3 = lazy(() => import('./pages/Page3'))
const Page4 = lazy(() => import('./pages/Page4'))
const Page5 = lazy(() => import('./pages/Page5'))
const Page6 = lazy(() => import('./pages/Page6'))
const Page7 = lazy(() => import('./pages/Page7'))
const Page8 = lazy(() => import('./pages/Page8'))
const Page9 = lazy(() => import('./pages/Page9'))
const Page10 = lazy(() => import('./pages/Page10'))

const NotFound = lazy(() => import('./pages/404'))

const RouterApp = () => {
  return (
    <React.Fragment>
      <Route index element={<Navigate to="/pages/Page1" />} />

      <Route path="/pages/Page1" element={<Page1 />}></Route>
      <Route path="/pages/Page2" element={<Page2 />}></Route>
      <Route path="/pages/Page3" element={<Page3 />}></Route>
      <Route path="/pages/Page4" element={<Page4 />}></Route>
      <Route path="/pages/Page5" element={<Page5 />}></Route>
      <Route path="/pages/Page6" element={<Page6 />}></Route>
      <Route path="/pages/Page7" element={<Page7 />}></Route>
      <Route path="/pages/Page8" element={<Page8 />}></Route>
      <Route path="/pages/Page9" element={<Page9 />}></Route>
      <Route path="/pages/Page10" element={<Page10 />}></Route>

      <Route path="*" element={<NotFound />} />
    </React.Fragment>
  )
}
console.log(RouterApp)

const App = () => {
  const AppRouters = generateAppRouterNodes(RoutesList)
  // console.log(AppRouters)

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {
            AppRouters
          }
          {/* {
            RouterApp()
          } */}
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
