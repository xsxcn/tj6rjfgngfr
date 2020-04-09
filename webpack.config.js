const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const dest = path.resolve(__dirname, "./dist");

module.exports = {
  entry: "./src/entry-client.js",
  output: {
    path: dest,
    publicPath: "/",
    filename: `[name].[hash].js`,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.pug" }),
    new CopyWebpackPlugin([{ from: "src/static" }]),
    new WriteFilePlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            scss: "vue-style-loader!css-loader!postcss-loader!sass-loader",
            sass:
              "vue-style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax",
          },
        },
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ["pug-plain-loader"],
          },
          {
            use: ["source-loader", "pug-static-loader"],
          },
        ],
      },
      {
        enforce: "pre",
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]",
        },
      },
    ],
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      FirebaseConfig$: path.resolve(__dirname, "firebase.config.json"),
    },
  },
  devServer: {
    historyApiFallback: false,
  },
  performance: {
    hints: false,
  },
};
