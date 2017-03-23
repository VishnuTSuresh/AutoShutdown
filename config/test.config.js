var webpackConfig = require("./common.config.js");
var path = require("path");

Object.assign(webpackConfig, {
    entry: "./src/test.js",
    output: {
        filename: "test.js",
        path: path.resolve('./tmp')
    }
});

module.exports = webpackConfig;