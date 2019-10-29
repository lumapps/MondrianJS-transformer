import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import svgr from "@svgr/rollup";

export default {
  input: "Candidates/Widget/index.js",
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
    svgr()
  ]
};
