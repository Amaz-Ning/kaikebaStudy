const path = require('path')
const webpack = require('webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: {
    main: './index.js',
    ext: './ext.js'
  },
  output: {
    filename: '[name]-[hash]}.js',
    path: path.resolve(__dirname, './build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('style.css'),
    new HtmlWebpackPlugin({
      // 打包输出HTML
      title: 'Hello World app',
      minify: {
        // 压缩HTML文件
        removeComments: false, // 移除HTML中的注释
        collapseWhitespace: false, // 删除空白符与换行符
        minifyCSS: false // 压缩内联css
      },
      filename: 'index.html',
      template: 'index.html'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      // 缓存组
      cacheGroups: {
        // 公共代码
        common: {
          // 立刻打包
          chunks: 'initial',
          // 最小0kb
          minSize: 0,
          // 最少2个共用
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}
