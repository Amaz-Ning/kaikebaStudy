//! webpack配置文件
const path = require("path");
module.exports = {
  // webpack构建的入口
  entry: "./src/index.js",
  //! production生产模式
  mode: "production",
  output: {
    //path：绝对路径的字符串
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js"
  }
};
