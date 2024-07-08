const path = require("path");

console.log(path.resolve(__dirname, 'dist'));
module.exports = {
    
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        port: 9000,
    },
}