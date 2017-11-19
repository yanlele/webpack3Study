const path = require('path');
const UglifyJsPlugin=require('uglifyjs-webpack-plugin');//代码压缩的插件
const htmlPlugin=require('html-webpack-plugin');//这个需要自己手动安装一次
const extractTextPlugin=require('extract-text-webpack-plugin');//这个是打包分离css的插件

var website={
    publicPath:'http://192.168.1.3:8081/'
};

module.exports = {
    entry: {
        entry: './src/entry.js',
        // entry2: './src/entry2.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name].js",
        publicPath: website.publicPath,//这个可以解决静态文件路径的问题
    },
    module: {
        rules: [
            {
                test: /\.css$/,//用正则匹配到需要使用loader处理的问题件
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader:"css-loader"
                        },
                        {
                            loader:'postcss-loader'
                        }
                    ]
                }), //配置处理loader
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
                        outputPath:"images/"
                    }
                }]
            },
            {
                test:/\.(html|htm)$/,
                use:['html-withimg-loader']
            },
            {
                test:/.less$/,
                use:extractTextPlugin.extract({
                    use:[{
                        loader: "css-loader"
                    },{
                        loader: "less-loader"
                    }],
                    fallback:"style-loader"
                })
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
        }),
        new extractTextPlugin('css/index.css')
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),//服务监听目录
        host: '192.168.1.3',
        compress: true,//是否启用服务器压缩
        port: 8081
    }
};