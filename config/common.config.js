var path=require("path");

module.exports = {
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ["*", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader"
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.handlebars$/,
                use: "handlebars-loader"
            }
        ]
    },
    target:"node"
}