const webpack = require('webpack');
const path = require('path');
const loaderUtils = require('loader-utils');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getCSSModuleLocalIdent = (context, localIdentName, localName, options) => {
  const fileNameOrFolder = context.resourcePath.match(
    /index\.module\.(css|scss|sass)$/) ? '[folder]' : '[name]';
  const hash = loaderUtils.getHashDigest(
    path.posix.relative(context.rootContext, context.resourcePath) + localName,
    'md5', 'base64', 5);
  const className = loaderUtils.interpolateName(
    context,
    fileNameOrFolder + '_' + localName + '__' + hash,
    options
  );

  return className.replace('.module_', '_');
}

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  const tsLoaders = () => {
    const loaders = [{
      loader: 'ts-loader'
    }]
    if(!isProduction) {
      loaders.push('eslint-loader')
    }
    return loaders
  }

  const config = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'source-map',
    watch: !isProduction,
    entry: ['babel-polyfill','./src/index.js'],
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'dist')
    },
    
    resolve: {
      extensions: ['.ts', '.js'],
      
    },

    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },

    devServer: {
      port: 3000
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: {
          collapseWhitespace: isProduction
        }
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css'
      })
    ],

    module: {
      rules: [
        {
          test: /\.ts$/i,
          exclude: /node_modules/,
          use: tsLoaders()
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: './assets/fonts/'
              }
            }
          ]
        },
        
        {
          test: /\.(bmp|png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: './assets/images/'
              }
            }
          ]
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        
      ]
    },
    stats: {
      children: true,
    },
    watch: true,
  }
  
  return config;
}
