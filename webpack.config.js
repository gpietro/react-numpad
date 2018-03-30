const webpack = require('webpack');

module.exports = {
  entry: './lib/index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },
  mode: 'development',
  resolve: {
    modules: ['node_modules', 'bower_components'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader', // 'babel-loader' is also a valid name to reference
        query: {
          presets: ['es2015', 'react'],
        },
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  devtool: 'source-map',
};
