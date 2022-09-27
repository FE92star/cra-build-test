const path = require('path')

const { override, addWebpackPlugin, addWebpackAlias, addLessLoader, adjustStyleLoaders, disableEsLint, addWebpackResolve } = require('customize-cra')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const RewireReactHotLoader = require('react-app-rewire-hot-loader')
const rewireHtmlWebpackPlugin = require('react-app-rewire-html-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")

const pkg = require('./package.json')

const IS_PROD = process.env.NODE_ENV === 'production'
const proxyTarget = 'http://localhost:10099'

const publicHost = 'yun.com.cn'

const webpackOverride = override(
  // disable eslint in webpack
  disableEsLint(),
  addLessLoader({
  // 这里可以添加less的其他配置
    lessOptions: {
      // 根据自己需要配置即可~
      javascriptEnabled: true
    }
  }),
  
  adjustStyleLoaders(({ use: [, , postcss] }) => {
    const postcssOptions = postcss.options
    postcss.options = { postcssOptions }
  }),

  // alias
  addWebpackAlias({
    '@': path.resolve(__dirname, './src/')
  }),

  addWebpackResolve({
    fallback: { "url": false }
  }),

  // bundle minify配置
  IS_PROD && addWebpackPlugin(
    new TerserPlugin({
      // 开启多线程打包
      parallel: true,
      // 禁止生成js的license.text文件
      extractComments: false,
      terserOptions: {
        // 压缩
        compress: {
          // 移除console
          drop_console: true,
          // 移除debugger
          drop_debugger: true
        }
      }
    }),
  ),
  addWebpackPlugin(new ProgressBarPlugin()),
  // 配置热更新、postcss相关
  (config) => {
    config = rewireHtmlWebpackPlugin(config, '', {
      template: path.resolve(__dirname, './public/index.html'),
      templateParameters: {
        env: IS_PROD ? '<%=env%>' : 'local',
      }
    })
    if (!IS_PROD) {
      config = RewireReactHotLoader(config, process.env.NODE_ENV)
    }
  
    return config  
  }
)


module.exports = {
  // 更改打包后的源码路径配置
  paths(paths) {
    // outputPath
    paths.appBuild = path.resolve(__dirname, 'dist')
    paths.publicUrlOrPath = IS_PROD ? `https://${publicHost}/${pkg.name}/dist/` : '/'
    return paths
  },
  // webpack相关配置
  webpack: webpackOverride,
  // 开发相关proxy配置
  devServer(configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost)
      config.proxy = {
        '/kjy': {
          target: proxyTarget,
          changeOrigin: true,
          pathRewrite: { '^': '' },
          headers: {
            referer: proxyTarget,
          },
        },
      }
      return config
    }
  }
}
