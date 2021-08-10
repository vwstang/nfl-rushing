const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    team: "./src/components/hydrateTeam.js",
    rushing: "./src/components/hydrate.js"
  },
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "[name].js"
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
      },
      {
        test: /.s?css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: { implementation: require("sass") }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
