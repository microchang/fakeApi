/**
 * Created by mic on 15-12-22.
 */
/**
 * Created by mic on 15-12-17.
 */
const webpack = require('webpack');
const path = require('path');

module.exports = {
  debug: false,
  // devtool: 'source-map',
  entry: ['./app.js'],
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: 'http://XXX.com/',
    // sourceMapFilename: "[file].map",
    filename: 'app.[hash].js'
    // filename: "app.js"
  },

  module: {
    loaders: [
      // js(jsx)
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
        plugins: ['transform-decorators-legacy'],
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      //css
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      // less
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      // url imgs
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000'
      },
      // font
      {
        test: /\.woff$/,
        loader: 'url-loader'
      }, {
        test: /\.(ttf|eot|svg)/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]

};