/**
 * require.context(文件目录,是否递归,匹配正则) 
 * return context() 
 * context(file_name) 返回模块,主要方法
 * context.id 
 * context.keys() 返回查询到的所有文件路径 file_name
 * context.resolve() 返回文件路径相对于项目的路径
 *  
 * return module
 */
let context = require.context('./',true,/\.(js|vue)/)
for(let a in context) {
    console.log(a) /* id, keys, reslove */
}

context.keys()/* 返回文件路径的数组 */.map(context) /* context(name) 引入模块 */


