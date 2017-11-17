const path = require('path');

module.exports = {
    entry: {
        entry: './src/entry.js',
        entry2: './src/entry2.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,//用正则匹配到需要使用loader处理的问题件
                use: [ 'style-loader', 'css-loader' ]//配置处理loader
                // include:'',//配置什么文件需要处理
                // exclude:'',//配置什么文件不需要处理
                // query:''//为loader配置额外配置项
            }
        ]
    },
    plugins: [],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),//服务监听目录
        host: '192.168.1.3',
        compress: true,//是否启用服务器压缩
        port: 8081
    }
};