const path = require("path");

console.log(path.resolve(__dirname, 'dist'));
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: 'bundle.js'
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

        static: {
            directory: path.join(__dirname, 'public'),
          },
          compress: true,
          port: 9000,
        },
}