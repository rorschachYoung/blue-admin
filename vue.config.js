/** 
 * @type { import('@vue/cli-service').ConfigFunction}
 * @type { import('@vue/cli-service').ProjectOptions}
  */

const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ['js', 'css']
module.exports = {
    // configureWebpack:{
    //     resolve:{
    //         alias:{
    //             '$':'@/assets'
    //         }
    //     }
    // },
    // chainWebpack(config){
    //     config.reslove.alias.set('$','@/assets')
    // },
    configureWebpack: {
        plugins: [
            new CompressionPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), // 只处理大于xx字节 的文件，默认：0
                threshold: 10240,  // 示例：一个1024b大小的文件，压缩后大小为768b，minRatio : 0.75
                minRatio: 0.8,
                // 是否删除源文件，默认: false
                deleteOriginalAssets: false
            })
        ],
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'element-ui': 'ELEMENT',
            'echarts': 'echarts',
            'axios': 'axios',
        },
    },
    publicPath: '/blue-admin',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://www.rorscloud.top:4000',
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    // css:{
    //     loaderOptions:{
    //         sass:{
    //             data:'@import "~@/assets/css/common.scss"', /* 全局引入一个 src/assets/csss/common.css,全局sass变量*/
    //         },
    //         less:{
    //             globalVars:{
    //                 primary:'#fff',/* 添加一个less的全局变量 */
    //             }
    //         }
    //     }
    // }
}