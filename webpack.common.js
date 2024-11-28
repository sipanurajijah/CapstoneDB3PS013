/* eslint-disable no-undef */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/scripts/index.js"),
    sw: path.resolve(__dirname, "src/scripts/sw.js"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.svg$/,
        use: "svg-inline-loader",
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]", // Nama file output
              outputPath: "assets/images", // Folder untuk file output
              publicPath: "assets/images", // Path publik saat diakses oleh browser
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: "main.css",
    }),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/templates/index.html"),
      favicon: "./src/public/favicon.ico",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public/"),
          to: path.resolve(__dirname, "dist/"),
        },
      ],
    }),
  ],
};
