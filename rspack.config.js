import path from "path";

export default {
  entry: "./src/index.ts",
  output: {
    path: path.resolve("dist"),
    filename: "index.js",
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
  },
  externals: {
    "next/router": "next/router",
    react: "react",
  },
  target: ["web", "es2020"],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "typescript",
              },
              target: "es2020",
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
