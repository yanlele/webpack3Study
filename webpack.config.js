const path = require('path');
const UglifyJsPlugin=require('uglifyjs-webpack-plugin');
const htmlPlugin=require('html-webpack-plugin');//这个需要自己手动安装一次

module.exports = {
    entry: {
        entry: './src/entry.js',
        // entry2: './src/entry2.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,//用正则匹配到需要使用loader处理的问题件
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ], //配置处理loader
                /*
                 * 配置loader的其他几种方式：
                 * 1、loader: ['style-loader', 'css-loader']
                 * 2、use:[
                 *  {
                 *      loader:"style-loader"
                 *  },
                 *  {
                 *      loader:"css-loader"
                 *  }
                 * ]
                 * */
                // include:'',//配置什么文件需要处理
                // exclude:'',//配置什么文件不需要处理
                // query:''//为loader配置额外配置项
            },
            {
                test:/\.(png|jpg|gif)/,
                use:[{
                    loader: "url-loader",
                    options:{
                        limit:5000,//大于5K 字节的，打包为图片，如果小于5K ，就转换为base64
                    }
                }]
            }
        ]
    },
    plugins: [
        //new UglifyJsPlugin()

        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true,//id=""引号去掉了
            },
            hash:true,//每次更新JS会加一个哈希，取消缓存的问题
            template:'./src/index.html'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),//服务监听目录
        host: '192.168.1.3',
        compress: true,//是否启用服务器压缩
        port: 8081
    }
};