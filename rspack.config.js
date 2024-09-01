const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: {
      type: "commonjs2",
    },
  },
  externals: {
    "next/router": "next/router",
    react: "react",
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
            },
          },
        },
        type: "javascript/auto",
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
