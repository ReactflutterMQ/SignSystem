const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // port: 8080,//端口号
    host: '0.0.0.0',//主机名
    // 配置代理
    proxy: {
      '/dev': {
        target: 'http://api.h5ke.top/',
        changeOrigin: true,
        pathRewrite: {
          '^/dev': ''
        }
      }
    }
  }
})
