const CopyPlugin = require("copy-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  devtool: "cheap-module-source-map",
  mode: "development",
});

const copyPluginTarget = module.exports.plugins[0].patterns[0].to;
const copyPluginTargetNew = copyPluginTarget.substr(0,copyPluginTarget.lastIndexOf('.')) + "-dev" + copyPluginTarget.substr(copyPluginTarget.lastIndexOf('.'));
module.exports.plugins[0].patterns[0].to = copyPluginTargetNew;