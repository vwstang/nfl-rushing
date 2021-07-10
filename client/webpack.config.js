const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/components/hydrate.js",
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "rushing.js"
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
