const path = require("path");
const nodeExternals = require("webpack-node-externals");

const { NODE_ENV = "production" } = process.env;

module.exports = {
  entry: path.resolve(__dirname, "./src/main.ts"),
  mode: NODE_ENV,
  target: "node",
  output: {
    publicPath: "/build/",
    path: path.resolve(__dirname, "./build"),
    filename: "[name].js",
    chunkFilename: "chunk.[name].js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"]
      }
    ]
  },
  watch: NODE_ENV === "development",
  externals: [nodeExternals()],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src")
    },
    extensions: [".ts", ".js"]
  }
};
