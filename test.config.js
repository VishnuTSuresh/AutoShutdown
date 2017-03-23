var webpackConfig =require("./webpack.config.js");

webpackConfig.entry="./src/test.js"
webpackConfig.output.filename="test.js"

module.exports = webpackConfig;