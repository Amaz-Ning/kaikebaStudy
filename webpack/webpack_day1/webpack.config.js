//! webpack配置文件
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  // webpack构建的入口 str | [] | obj
  //   entry: ["./src/index.js", "./src/other.js"],
  //   entry: "./src/index.js",
  //   entry: {
  //     main: "./src/index.js",
  //     other: "./src/other.js",
  //     testssss: "./src/test.js"
  //   },
  //! production生产模式
  mode: "development", //none  development production
  //出口
  output: {
    //path：绝对路径的字符串
    path: path.resolve(__dirname, "./dist"),
    // filename: "main.js"
    //! name是占位符，main.js,other.js
    // filename: "[name]_[chunkhash:8].js",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // 两个loader loader有执行顺序，自右往左
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.png$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]"
          }
        }
      }
    ]
  },
  devtool: "inline-source-map",
  plugins: [
    new htmlWebpackPlugin({
      title: "京东商城",
      template: "./index.html",
      filename: "kkb.html"
    }),
    new CleanWebpackPlugin()
  ]
};

// spa单页面应用 mpa多页面应用
// Vue React
// SEO 搜索引擎优化， SEM搜索引擎营销 = 网站的排名，引流
