const path=require('path');

module.exports={
    entry:{
        entry:'./src/entry.js',
        entry2:'./src/entry2.js'
    },
    output: {
        path:path.resolve(__dirname,'dist'),
        filename: "[name].js"
    },
    module:{

    },
    plugins: [],
    devServer: {
        contentBase:path.resolve(__dirname,'dist'),//服务监听目录
        host:'192.168.1.3',
        compress:true,//是否启用服务器压缩
        port:8081
    }
};