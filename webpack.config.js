const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');

const path = require('path');

module.exports = env => {
    return {
        entry: './bootstrap.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: "bootstrap.js"
        },
        mode: env.NODE_ENV,
        plugins: [
            new WebpackAutoInject({
                componentsOptions: {
                    AutoIncreaseVersion: {
                        runInWatchMode: false // it will increase version with every single build!
                    },
                    InjectAsComment: {
                        tag: 'Oston: {version} - {date}',
                        dateFormat: 'dd/MM/yyyy', // change timezone: `UTC:h:MM:ss` or `GMT:h:MM:ss`
                        multiLineCommentType: false, // use `/** */` instead of `//` as comment block
                    }
                }
            }),
            new CompressionPlugin({
                algorithm: 'gzip',
            }),
            new CleanWebpackPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
                }
            ]
        }
    }
}
