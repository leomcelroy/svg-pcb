import js_beautify from 'js-beautify'


export function formatCode(code) {
  try {
    const options = {
      indent_size: 2,
      "brace_style": "collapse,preserve-inline",
    }
    return js_beautify(code, options)
  } catch (error) {
    console.log(error)
    return code // return the original code if there's an error
  }
}