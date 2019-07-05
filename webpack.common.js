const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './lib/index',
  output: {
    filename: '[name].bundle.js',    
    path: `${__dirname}/dist`,
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'development',
  resolve: {
    modules: ['node_modules', 'bower_components'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader', // 'babel-loader' is also a valid name to reference
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { test: /\.(png|jpg|)$/, loader: 'url-loader?limit=200000' },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /node_modules\/(pdfkit|fontkit|png-js|linebreak|unicode-properties|brotli)\//,
        loader: 'transform-loader?brfs',
      },
      { test: /node_modules\/unicode-properties.*\.json$/, use: 'json-loader' },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),    
  ],
  devtool: 'source-map',
};
