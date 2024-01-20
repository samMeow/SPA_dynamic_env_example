import path from 'node:path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import dotenv from 'dotenv'

let env = {}
const result = dotenv.config({ path: path.resolve('.env') })
if (result.parsed) {
  env = result.parsed
}

export default (_, { mode }) => ({
  entry: path.resolve('./src', 'main.tsx'),
  mode,
  context: path.resolve('./src'),
  devtool: mode === 'production' ? 'source-map' : 'cheap-module-source-map',
  experiments: {
    outputModule: true
  },
  target: ['web', 'es6'],
  ...(mode === 'production' && ({
    externalsType: 'module',
    externals: {
      '@/env': '/env.js'
    }
  })),
  resolve: {
    modules: [path.resolve('./src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@/env': path.resolve('./src', 'env.ts')
    }
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              '@babel/preset-env',
              ["@babel/preset-react", {
                "runtime": "automatic"
              }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          }
        ]
      },
      {
        test: /.(woff|woff2|otf|ttf|eot|svg|png|jpg)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('index.html'),
      scriptLoading: 'module',
      inject: 'head'
    }),
    new CopyPlugin({
      patterns: [{ from: path.resolve('./public'), to: path.resolve('./dist') }]
    })
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve('./dist'),
    publicPath: '/',
    clean: true
  }
})