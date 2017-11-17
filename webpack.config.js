const path=require('path');

module.exports={
    entry:{
        entry:'./src/entry.js'
    },
    output: {
        path:path.resolve(__dirname,'dist'),
        filename: "bundle.js"
    },
    module:{

    },
    plugins: [],
    devServer: {

    }
};