/** 
 * @type { import('@vue/cli-service').ConfigFunction}
 * @type { import('@vue/cli-service').ProjectOptions}
  */

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
    publicPath:'/blue-admin',
    devServer:{
        proxy:{
            '/api':{
                target:'http://www.rorscloud.top:4000',
                pathRewrite:{
                    '^/api':''
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