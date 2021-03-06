var express = require('express');
var app = express();
var engine = require('consolidate');
var path = require('path');
var router = express.Router();
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var NODE_ENV = process.env.NODE_ENV || 'production';
var webpackConfig = NODE_ENV =="production"? require('./webpack.prod.config.js'):require('./webpack.dev.config.js');


app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.set('port', 8022);
//app.engine('.html', require('html').__express);
app.engine('html', engine.mustache);
app.set('view engine', 'html');
//设置页面路径
app.set('views', path.join(__dirname, '/'));

if(NODE_ENV === 'development'){    
    Object.keys(webpackConfig.entry).forEach(function(key){
    	webpackConfig.entry[key].unshift('webpack-hot-middleware/client?reload=true');    
    });    
    var compiler = webpack(webpackConfig);
	app.use(webpackDevMiddleware(compiler, {
	    publicPath: webpackConfig.output.publicPath,
	    noInfo: true,
	    stats: {
	        colors: true
	    }
	}));

	app.use(webpackHotMiddleware(compiler));
    
    router.get('/virtualdom/index', function(req, res){
        res.render('./src/test/index.html', {
            env: NODE_ENV
        });
    });
    app.use(router);
}

var server = app.listen(app.get('port'), function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("express server listening on %s %s", host, port);
});
