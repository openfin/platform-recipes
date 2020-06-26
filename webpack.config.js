const path = require('path');
const {launch} = require('hadouken-js-adapter');

module.exports = {
    mode: 'development',
    entry: {
        provider: './example/provider/provider.ts',
        frame: './example/frame/frame.ts'
    },
    module: {
        rules: [
            {
                test: /\.[t|j]sx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].bundle.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'static'),
        compress: true,
        port: 5555,
        onListening: function () {
            launch({manifestUrl: 'http://localhost:5555/app.json'})
        }
    }
}