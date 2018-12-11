const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    console.log(argv.mode); // development
    return {
        entry: {
            code: './src/code.ts'
        },
        // devtool: "inline-source-map",
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                // 使用 ts-loader 我们可以让 webpack 自动先调用 tsc 将 TypeScript 代码编译为 JavaScript 代码，然后再自动进行打包工作。
                use: 'ts-loader',
                exclude: /node_modules/
            }]
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js'
        },
        plugins: [
            new copyWebpackPlugin([
                // from是以实际的项目目录为基础， to 则是以output下的path 或者 devServer下的contentBase为基础。
                {
                    from: 'index.html',
                    to: 'index.html'
                }
            ])
        ],
        //本地服务器所加载的页面(默认是index.html)所在的目录以及会替换掉output的path
        // webpack-dev-server会把output的结果输出放在内存中。因此不会有实际的文件输出。
        devServer: {
            contentBase: path.join(__dirname, 'dist'), //本地服务器所加载的页面所在的目录以及会替换掉output的path
            inline: true, // 实时刷新, 默认是true
            port: 3003 // server端口， 默认是8080
        },
    }
};