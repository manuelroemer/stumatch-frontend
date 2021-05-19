const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = (env, argv = {}) => {
  return {
    entry: resolve(__dirname, 'src', 'index.tsx'),
    mode: argv.mode || process.env.NODE_ENV || 'production',
    target: 'web',
    devtool: 'source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    output: {
      filename: '[name].js',
      path: resolve(__dirname, 'dist'),
    },
    devServer: {
      contentBase: resolve(__dirname, 'src'),
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
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.(jpg|png|gif|svg)$/,
            use: ["file-loader"],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: resolve(__dirname, 'src', 'index.html'),
      })
    ]
  };
};
