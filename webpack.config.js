const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = (env, argv = {}) => {
  const mode = argv.mode || process.env.NODE_ENV || 'production';

  return {
    entry: resolve(__dirname, 'src', 'index.tsx'),
    mode,
    target: 'web',
    devtool: mode === 'production' ? 'source-map' : 'eval-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    output: {
      filename: '[name].js',
      path: resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    devServer: {
      contentBase: resolve(__dirname, 'src'),
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: '/node_modules/',
          use: 'babel-loader',
        },
        {
          test: /\.(css|scss)$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: ['file-loader'],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new DefinePlugin({
        // TODO: We don't actually have a production URL. Update as required.
        API_BASE_URL: JSON.stringify(mode === 'production' ? 'http://localhost:4040' : 'http://localhost:4040'),
        WS_BASE_URL:  JSON.stringify(mode === 'production' ? 'ws://localhost:4040' : 'ws://localhost:4040'),
      }),
      new HtmlWebpackPlugin({
        template: resolve(__dirname, 'src', 'index.html'),
      }),
    ],
  };
};
