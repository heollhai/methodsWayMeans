const path = require("path"); //用于路径别名使用，，，这个需要下载  npm  install  path  --save
function resolve(dir) {
  return path.join(__dirname, dir); //不确定干嘛用   引入路径需要使用这个方法
}
module.exports = {
  chainWebpack: config => {
    //更改路径别名   改为可以使用  @
    config.resolve.alias.set("@", resolve("src"));
  },
  devServer: {
    port: 8080,
    open: true
    // proxy: {}
  }
};
