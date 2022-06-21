// snowpack.config.mjs
export default {
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
  },
  buildOptions: {
    htmlFragments: true
  },
  alias: {
    "gram-js": "https://leomcelroy.com/gram-js/exports.js",
    "code-mirror": "https://leomcelroy.com/widgets/code-mirror.js"
  },
};