```javascript
mkdir webpack-ts-demo && cd webpack-ts-demo
yarn init -y
yarn add webpack webpack-dev-server ts-loader typescript rxjs
yarn add webpack-cli -D

webpack.config.js

tsconfig.json
```

```json
package.json

{
  "name": "rxjs-learn",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "start": "webpack-dev-server --mode=development"
  },
  "dependencies": {
    "rxjs": "^6.3.3",
    "ts-loader": "^5.3.1",
    "typescript": "^3.2.2",
    "webpack": "^4.27.1",
    "webpack-dev-server": "^3.1.10"
  },
  "devDependencies": {
    "webpack-cli": "^3.1.2"
  }
}

```

```javascript
webpack.config.js

const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    console.log(argv.mode); // development
    return {
        entry: './src/code.ts',
        devtool: "inline-source-map",
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
            filename: 'bundle.js'
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
```

```javascript
{
  "compilerOptions": {
    //目标代码类型
    "target": "es6",/* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */
    //指定生成哪个模块系统代码
    "module": "es6",/* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    "lib": [
      "es2017",
      "dom"
    ],/* Specify library files to be included in the compilation. */
    "sourceMap": true,/* Generates corresponding '.map' file. */
    "outDir": "./dist/",/* Redirect output structure to the directory. */
    "typeRoots": [
      "node_modules/@types"
    ],/* List of folders to include type definitions from. */
  },
  "exclude": ["node_modules"]
}

```