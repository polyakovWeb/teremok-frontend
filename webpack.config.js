import { resolve } from "path";
import { DefinePlugin } from "webpack";
import dotenv from "dotenv";

export const entry = "./src/app.js";
export const output = {
  path: resolve(__dirname, "public"),
  filename: "app.js",
};
export const module = {
  rules: [
    {
      test: /\.js?$/,
      exclude: /(node_modules)/,
      include: resolve(__dirname, "src"),
      use: {
        loader: "babel-loader",
      },
    },
  ],
};
export const plugins = [
  new DefinePlugin({
    "process.env": JSON.stringify(dotenv.config().parsed),
  }),
];
