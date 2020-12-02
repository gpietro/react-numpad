const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './lib/index',
  output: {
    filename: 'react-numpad.js',
    path: `${__dirname}/dist`,
    libraryTarget: 'umd',
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
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
      '@material-ui/core': {
        root: 'MaterialuiCore',
        commonjs2: '@material-ui/core',
        commonjs: '@material-ui/core',
        amd: '@material-ui/core',
      },
      '@material-ui/icons': {
        root: 'MaterialuiIcon',
        commonjs2: '@material-ui/icons',
        commonjs: '@material-ui/icons',
        amd: '@material-ui/icons',
      },
    },
  ],
  plugins: [new CleanWebpackPlugin(), new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
  devtool: 'source-map',
};
