const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HelloWorldPlugin = require('./plugins/HelloWorldPlugin');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: './dist',
  },
  resolveLoader: {
    modules: ['node_modules', './loaders'],
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'sass-loader',
          // {
          //   loader: path.resolve(__dirname, 'loaders', 'style-loader.js'),
          // },
          // {
          //   loader: path.resolve(__dirname, 'loaders', 'sass-loader'),
          // },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
      scriptLoading: 'blocking',
    }),
    new HelloWorldPlugin({ options: true }),
  ],
};
