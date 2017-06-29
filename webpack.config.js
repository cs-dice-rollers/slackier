const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Config directories
const SRC_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');

// Any directories you will be adding code/files into,
// need to be added to this array so webpack will pick them up
const defaultInclude = [SRC_DIR];

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

// https://github.com/webpack/style-loader
const styleLoaderConfig = { loader: 'style-loader' };
// https://github.com/webpack/css-loader
const cssLoaderConfig = { loader: 'css-loader',
  options: {
    sourceMap: true,
    modules: true,
    importLoaders: 1,
    localIdentName: '[name]__[local]',
    minimize: true,
  },
};
// https://github.com/jtangelder/sass-loader
const sassLoaderConfig = { loader: 'sass-loader',
  options: {
    sourceMap: true,
  },
};

const sassLoaders = [styleLoaderConfig, cssLoaderConfig, sassLoaderConfig];

module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    path: OUTPUT_DIR,
    publicPath: './',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: sassLoaders,
        include: defaultInclude,
      },
      {
        test: /\.jsx?$/,
        use: [{ loader: 'babel-loader' }],
        include: defaultInclude,
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
        include: defaultInclude,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
        include: defaultInclude,
      },
    ],
  },
  target: 'electron-renderer',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Slackier',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.SOCKET_SERVER': JSON.stringify(process.env.SOCKET_SERVER),
    }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: OUTPUT_DIR,
    stats: {
      colors: true,
      chunks: false,
      children: false,
    },
  },
  externals: nodeModules,
};
