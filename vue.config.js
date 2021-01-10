
const path = require("path");
module.exports = {
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    // webpack-dev-server 相关配置
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "localhost", 
        port: '8080', 
        https: false,   //是否使用https协议
        hotOnly: false, //是否开启热更新
        proxy: {
            '/jhApi': {
                target: 'http://42.48.91.149:48080', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/jhApi': ''
                }
            },
            '/testMock': {
                target: 'http://rap2.taobao.org:38080/app/mock/249979', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/testMock': ''
                }
            }
        },
    },
    // 第三方插件配置
    pluginOptions: {
      'process.env': {
        NODE_ENV: '"development"'
      },
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: [
			path.resolve(__dirname, './src/style/theme.less')
		]
      }
    }
}
