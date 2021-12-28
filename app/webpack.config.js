const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = function (_, arg) {
  const config = {
    entry: "./src/index",
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: 'http://localhost:3002/',
      clean: true
    },
    mode: arg.mode,
    devServer: {
      port: 3002,
      headers: {
          // cors
          'Access-Control-Allow-Origin': '*'
      }
    },
    plugins: [
        new ModuleFederationPlugin({
          name: 'app',
          library: { type: 'var', name: 'app' },
          remotes: {
            arcgis: 'arcgis', // name of remote library to expose, could aias if you want
          },
          shared: {
            // this is just an aggressive way of sharing deps across apps
              ...deps,
              "'@arcgis/core'": { singleton: true }
          },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            federatedURL: "http://localhost:3001/remoteEntry.js"
        }),
      ],
  };

  return config;
}
