var webpack = require("webpack");
var path = require('path');
var NODE_ENV=process.env.NODE_ENV;

module.exports = {
    devtool: 'source-map',

    entry:{
        index:["./src/test/index.js"]
    }, //入口文件
    
    output: {
        publicPath:"/dev/",
        path: __dirname + '/dist/js', //打包后的文件存放的地方
        filename: '[name].js' //打包后输出文件的文件名
    },
    
    module: {
        loaders: [
             {test: /\.js$/,exclude: /node_modules/,loader: 'babel-loader'}
        ]
    },
    
    plugins: [               
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV:NODE_ENV
            }
        }),
        
        new webpack.HotModuleReplacementPlugin(),        

        new webpack.NoErrorsPlugin()
    ],
}
