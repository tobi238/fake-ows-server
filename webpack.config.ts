import path from "path";
import webpack from "webpack";
const nodeExternals = require("webpack-node-externals");

const config: webpack.Configuration = {
  entry: "./src/app.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "build")
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  target: "node",
  externals: [nodeExternals()]
};

export default config;
