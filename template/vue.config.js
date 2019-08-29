const ENVFILE = require(__dirname + '/env.json');
console.log(ENVFILE);
let MCommonUrl = ENVFILE.COMMON_URL;
if (process.env.NODE_ENV === 'development') {
    MCommonUrl = '';
} else {
    process.env.VUE_APP_API_BASE = ENVFILE.API_BASE;
    process.env.VUE_APP_BASE_URL = ENVFILE.BASE_URL;
    process.env.VUE_APP_ENV = ENVFILE.ENV;
    process.env.NODE_ENV = process.env.VUE_APP_ENV ? 'production' : 'development';
    console.log('build evn：', process.env.VUE_APP_ENV);
    console.log('build evn common url：', MCommonUrl);
    console.log('build evn api base：', process.env.VUE_APP_API_BASE);
    console.log('build evn static base url：', process.env.VUE_APP_BASE_URL);
}
// 引用gzip
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
// return

module.exports = {
    //1.从vue cli3.3开始已弃用，请使用publicPath
    baseUrl: process.env.VUE_APP_BASE_URL,
    /*
      2.1部署应用包时的基本URL。用法和webpack本身的output.publicPath一致。但在cli的其它地方也会用到这个值，所以请不要直接修改webpack的output.publicPath。
    */
    publicPath: process.env.VUE_APP_BASE_URL,
    outputDir: 'dist',
    indexPath: 'index.html',
    filenameHashing: true,
    chainWebpack: config => {
        /**
         * 删除懒加载模块的prefetch
         */
        config.plugins.delete('prefetch');
    },
    configureWebpack: {
        plugins: [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }),
            new HtmlWebpackPlugin({
                template: 'public/index.html', // Load a custom template
                COMMON_URL: MCommonUrl || 'http://sl-cdn.slradio.cn/common/',
                BASE_URL: process.env.VUE_APP_BASE_URL,
                inject: 'body' // Inject all scripts into the body
            })
        ],
        externals: {
            "BMap": "BMap"
        }
    },
    devServer: {
        disableHostCheck: true,
        port: 80,
        proxy: {
            '/api': {
                // target: 'http://192.168.20.28:80',
                target: 'http://api-cms.staging.slradio.cn',
                //   target: 'http://api-cms.yq.on-radio.cn',

                changeOrigin: true, //改变源
                pathRewrite: {
                    //   '^/api': 'http://192.168.20.28:80'
                    '^/api': 'http://api-cms.staging.slradio.cn'
                    //    '^/api': 'http://api-cms.yq.on-radio.cn'

                }
            }
        }
    }
}
