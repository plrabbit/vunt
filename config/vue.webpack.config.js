const sourcesCDN = require('./cdn.config')
const plugins = require('./plugins.config')

const isProduction = process.env.NODE_ENV === 'production'

/**
 * configureWebpack in vue.config.js
 */
const configureWebpack = function () {
  const baseConfig = {
    performance: {
      /* The way that shows hints about building files sizes */
      hints: false
    },

    /* CDN resources */
    externals: isProduction ? sourcesCDN.externals : {},

    resolve:{
      /* Decrease the svg icons bundle size
         In the future, ant design official will provide new API to allow us importing icons as our need  */
      alias:{
        '@ant-design/icons': 'purched-antd-icons'
      }
    }
  }

  return Object.assign({}, baseConfig, {
    plugins
  })
}

/**
 * chainWebpack in vue.config.js
 */
const chainWebpack = function(config) {
  if (isProduction) {
    sourcesCDN.useCDN && config.plugin('html').tap(args => {
      args[0].cdn = sourcesCDN
      return args
    })
  }
}

module.exports = { configureWebpack, chainWebpack }