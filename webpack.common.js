const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const pluginID = "FastTagger";

module.exports = {
  entry: "./src/main.tsx",
  output: {
    filename: pluginID + ".js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "src/source.yml",
          to: pluginID + ".yml",
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: pluginID + ".css",
    }),
  ],
  resolve: {
    alias: {
      "@common": path.resolve(__dirname, "./src/common"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@helpers": path.resolve(__dirname, "./src/helpers/index"),
      "@pluginTypes": path.resolve(__dirname, "./pluginTypes"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
};
