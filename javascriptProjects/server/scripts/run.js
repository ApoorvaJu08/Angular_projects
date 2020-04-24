const http = require('http')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const setupWebpackMiddleware = require('webpack-dev-middleware')

const port = 8080
const app = express()
const webpackMiddleware = setupWebpackMiddleware(
    webpack({
        entry: './src/index.js',
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            ]
        },
        output: {
            path: '/',
            filename: 'script.js',
            devtoolModuleFilenameTemplate: info => info.resourcePath
        },
        devtool: 'source-map'
    })
)

app.use(webpackMiddleware)
app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve('./src/index.html'))
})

const server = http.createServer(app)
server.listen(port, () => {
    console.log(`Web server listening on port ${port}`);
})