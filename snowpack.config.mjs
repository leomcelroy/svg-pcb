// snowpack.config.mjs
export default {
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
  },
  alias: {
    "lit-html": "https://cdn.skypack.dev/lit-html",
    "esprima": "https://cdn.skypack.dev/esprima",
    "acorn": "https://cdn.skypack.dev/acorn",
    "astring": "https://cdn.skypack.dev/astring",
    "esprima-walk": "https://cdn.skypack.dev/esprima-walk",
    "gram-js": "https://leomcelroy.com/gram-js/exports.js",
    "code-mirror": "https://leomcelroy.com/widgets/code-mirror.js"
  },
};