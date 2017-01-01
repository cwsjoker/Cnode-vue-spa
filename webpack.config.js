var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var vue = require("vue-loader");

// 配置异步加载地址
var project_publicPath = process.env.NODE_ENV === 'production' ? __dirname + '/build/' : '/build/';

//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src/main.js');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

var plugins = [
	//压缩js 
	// new webpack.optimize.UglifyJsPlugin({minimize: true}),
	//提公用js到common.js文件中
  new webpack.optimize.CommonsChunkPlugin('common.js'),
	//将样式统一发布到style.css中
  new ExtractTextPlugin("style.css", {
    allChunks: true
  })
];


module.exports = {
  //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
  entry: {
    build : APP_PATH
  },
  //输出的文件名 合并以后的js会命名为bundle.js
  output: {
    path: BUILD_PATH,
    filename: '[name].js',
    // 指向异步加载的路径
    // 博客异步加载地址
    // publicPath :  '/mystatic/CNode_Vue_Spa' + '/build/',
    // 异步加载地址
    publicPath : project_publicPath,
    // 非主文件的命名规则
    chunkFilename: '[id].build.js?[chunkhash]'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", 'css-loader')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url?limit=40000'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  vue: {
    css: ExtractTextPlugin.extract("css"),
    sass: ExtractTextPlugin.extract("css!sass-loader")
  },
  babel: {
    // 告诉babel你要解析的语言
    presets: ['es2015']
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
  plugins: plugins
};