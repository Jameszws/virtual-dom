var webpack = require("webpack");
var path = require('path');
var commonsPlugin = webpack.optimize.CommonsChunkPlugin;
var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {   

    entry:{        
        specialTicket: './src/components/SpecialTicket.jsx',
        specialHotel: './src/components/SpecialHotel.jsx',
        specialHotelDate: './src/components/SpecialHotel-Date.jsx',
        specialHotelDestination: './src/components/SpecialHotel-Destination.jsx',
        test:'./src/components/test.jsx',        
    }, //入口文件
    
    output: {
        publicPath:"../dist/js",
        path: __dirname + '/dist/js', //打包后的文件存放的地方
        filename: '[name].js' //打包后输出文件的文件名
    },

    resolve: {
        alias: {
            //'react': path.join(__dirname, './src/libs/react-lite.min.js'),
            //'react-dom': path.join(__dirname, './src/libs/react-lite.min.js'),
            'cityData': path.join(__dirname, './src/static/cityData2.js'),
            'ActUtil': path.join(__dirname, './src/libs/act.util.js'),
        }
    },
    
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: 'babel-loader?presets[]=es2015,presets[]=react'},            
            //{ test: /\.css$/, loader: 'style-loader!css-loader' }
            { test: /\.css$/, loader:  ExtractTextPlugin.extract("style-loader","css-loader") }
        ]
    },

    plugins: [        
        
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            mangle:{
                except:['$super','$','exports','require']
            }
        }),
        
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV:JSON.stringify('production')
            }
        }),

        new commonsPlugin('common.js'),

        new ExtractTextPlugin("css/[name].min.css"),
        
        new HtmlWebpackPlugin({
            filename: __dirname + '/views/SpecialPrice/specialTicket.cshtml',
            template:__dirname+'/src/templ/prod/templ.html',
            inject:'body',
            hash:true,
            chunks: ['specialTicket','common.js'],   // 这个模板对应上面那个节点
            minify: { //压缩HTML文件    
                removeComments: false, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        
         new HtmlWebpackPlugin({
             filename: __dirname + '/views/SpecialPrice/specialHotel.cshtml',
             template: __dirname + '/src/templ/prod/templ.html',
             inject: 'body',
             hash: true,
             chunks: ['specialHotel','common.js'],   // 这个模板对应上面那个节点
             minify: { //压缩HTML文件    
                 removeComments: false, //移除HTML中的注释
                 collapseWhitespace: false //删除空白符与换行符
             }
         }),

         new HtmlWebpackPlugin({
             filename: __dirname + '/views/SpecialPrice/SpecialHotelDate.cshtml',
             template: __dirname + '/src/templ/prod/templ.html',
             inject: 'body',
             hash: true,
             chunks: ['specialHotelDate','common.js'],   // 这个模板对应上面那个节点
             minify: { //压缩HTML文件    
                 removeComments: false, //移除HTML中的注释
                 collapseWhitespace: false //删除空白符与换行符
             }
         }), 

         new HtmlWebpackPlugin({
             filename: __dirname + '/views/SpecialPrice/SpecialHotelDestination.cshtml',
             template: __dirname + '/src/templ/prod/templ.html',
             inject: 'body',
             hash: true,
             chunks: ['specialHotelDestination','common.js'],   // 这个模板对应上面那个节点
             minify: { //压缩HTML文件    
                 removeComments: false, //移除HTML中的注释
                 collapseWhitespace: false //删除空白符与换行符
             }
         }),        

         new HtmlWebpackPlugin({
             filename: __dirname + '/views/SpecialPrice/test.cshtml',
             template: __dirname + '/src/templ/prod/templ.html',
             inject: 'body',
             hash: true,
             chunks: ['test','common.js'],   // 这个模板对应上面那个节点
             minify: { //压缩HTML文件    
                 removeComments: false, //移除HTML中的注释
                 collapseWhitespace: false //删除空白符与换行符
             }
         }),
        
    ]

}
