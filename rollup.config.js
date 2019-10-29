import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import svgr from "@svgr/rollup";
import url from "rollup-plugin-url";

export default {
  input: "Candidates/App.js",
  output: {
    file: "Transformed/Widget.mdr",
    format: "amd"
  },
  plugins: [
    postcss({
      extensions: [".css"]
    }),
    babel({
      ...JSON.parse(require("fs").readFileSync(".babelrc", "utf8")),
      exclude: "node_modules/**",
      presets: ["@babel/env", "@babel/preset-react"]
    }),
    url(),
    svgr()
  ]
};
