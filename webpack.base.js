const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (env, args) {
  const o = {
    target: 'web',
    mode: env || 'development',
    entry: {
      index: path.join(__dirname, `./src/index.js`)
    },
    output: {
      path: path.join(__dirname, './dist'),
      publicPath: '/',
      filename: `[name].bundle.js`,
      chunkFilename: '[name].bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        loader: 'file-loader',
        test: /\.(png|jpg|gif|svg|mp4|mp3)$/,
        options: {
          name: '[name].[ext]?[hash]'
        }
      }, {
        test: /\.(glsl|frag|vert)$/,
        use: 'raw-loader',
        exclude: /node_modules/
      }]
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'drops-1'
      }),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
      })
    ],

    externals: [ 'canvas' ],

    optimization: {
      minimize: env === 'production'
    }
  }

  if (env === 'development') {
    o.devtool = 'cheap-module-source-map'
    o.watch = true
    o.watchOptions = {
      aggregateTimeout: 1000, // in ms
      poll: 500
    }
    o.devServer = {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000
    }
  }

  return o
}
