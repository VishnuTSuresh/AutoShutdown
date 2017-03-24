var webpackConfig = require("./common.config.js");
var path = require("path");

Object.assign(webpackConfig, {
    entry: {
        index:"./src/index.ts",
        ui:"./src/ui.ts"
    },
    output: {
        filename: "[name].js",
        path: path.resolve('./dist')
    },
});

module.exports = webpackConfig;