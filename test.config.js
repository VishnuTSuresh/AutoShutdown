var webpackConfig =require("./webpack.config.js");
var path=require("path");

webpackConfig.entry="./src/test.js"
webpackConfig.output.filename="test.js"
webpackConfig.output.path= path.resolve(__dirname, 'tmp'),
module.exports = webpackConfig;