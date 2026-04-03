const { Dirent } = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    target: 'web',
    mode:"development",
    

    entry: path.resolve(__dirname, 'src', 'main.js'),
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        port: 8080,
        open: true,
        liveReload: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            favicon: path.resolve(__dirname, 'src', 'assets', 'scissors.svg')   
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src', 'assets'), 
                  to: path.resolve(__dirname, 'dist','src', 'assets') 

                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'] 
            },
            {
              test: /\.css&/ig,  
              exclude: /node_modules/,
              use:{
                loader: "babel-loader",
                options:{ 
                    presets: ["@babel/preset-env"]
                },
              },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },

        ],

    },      
}