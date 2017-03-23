var webpackConfig = require("./common.config.js");
var path = require("path");

Object.assign(webpackConfig, {
    entry: "./src/index.ts",
    output: {
        filename: "index.js",
        path: path.resolve('./dist')
    },
});

module.exports = webpackConfig;