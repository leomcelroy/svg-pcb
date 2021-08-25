const tokenRules = {
  num: /\d+\.\d+|\d+\.|\.\d+|\d+/,
  string: /".*"/,
  // keywords: ["and", "or"],
  // string: { start: `"`, full: /".*"/ }, // how to have start, middle, end
  // string2: [`"`, /.*/, `"`], // try first, when that stops move to second, if all fit then take
  // should be this not [`"`, /.*/, `"`] because middle won't stop
  // op: ch => ["+", "-", "/", "*", "**"].some(x => x.startsWith(ch)), // what about **
  // symbol: /[a-zA-Z][a-zA-Z\d]*/,
  ws: /\s+/,
  // literals: ch => ["{", "}", "[", "]", ":", ","].includes(ch)
}

const skip = ["ws"];
const literals = ["{", "}", "[", "]", ":", ","]; // makes the type the value

const regExFunc = regex => string => { 
  const match = string.match(regex); 
  return match && match[0] === string;
}

const makeTest = (rule, start = false) => 
  rule instanceof RegExp ? regExFunc(rule)
  : typeof rule === "string" ? x => rule.startsWith(x)
  : Array.isArray(rule) ? x => rule.map(makeTest).some(f => f(x))
  : rule; // is function

const makeTokenizer = (rules, { skip = [] , literals = [] } = { }) => string => { 
  let index = 0;
  const peek = () => string[index];
  const next = () => string[index++];
  const tokens = [];

  while (index < string.length) {
    let type, test, value;

    for (const key in rules) {
      type = key;
      test = rules[key];


      value = string.slice(index).match(rule);
      console.log(value);
      if (value !== null) {
        value = value[0];
        console.log(value);
        index += value.length;
        break;
      }
    }

    if (value === null) throw `Unknown character: ${peek()}`

    if (literals.includes(value)) type = value;
    if (!skip.includes(type)) tokens.push({ type, value, index });
  }

  return tokens;
}

//////////////////////////////

const convert = pred => s => {
  return s[0] && (s[0].type === pred)
    ? [ s[0], s.slice(1) ] 
    : null
}

// const any = s => s[0] ? [ s[0], s.slice(1) ] : null; // Do I want this?

const many = (pred) => s => {
  if (typeof pred === "string") pred = convert(pred);

  const arr = [];
  let next = pred(s);

  while (next) {
    arr.push(next);
    next = pred(next[1]);
  }

  return arr.length > 0 
    ? [ arr.map(([x]) => x), arr[arr.length - 1][1] ] 
    : [[], s];
}

const or = (preds, transform = null) => s => {
    const result = preds.reduce((acc, cur) => 
        acc || (typeof cur === "string" ? convert(cur) : cur)(s)
      , false);

    return (transform ? transform(result) : result) || null
}

const and = (preds, transform = null) => s => { // must match each predicate
  const result = [];
  for (let pred of preds) {
    if (typeof pred === "string") pred = convert(pred);

    const next = pred(s);
    if (next === null) return null;
    s = next[1];
    result.push(next[0])
  }
  
  return result.length === preds.length 
    ? [transform ? transform(result) : result, s] 
    : null;
}

class Stream {
  constructor(ast) {
    this.index = 0;
    this.ast = ast;
  }

  peek() {
    return this.ast[this.index];
  }

  next() {
    const current = this.ast[this.index];
    this.index++;
    return current;
  }

  eof() {
    return this.peek() === undefined;
  }
}

//////////////////////////////

const unaries = {
  "-": x => -x
}

const ops = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
};

const types = {
  symbol: (value, args) => turtle[value](...args),
  num: (value) => Number(value),   
  op: (value, x, y) => ops[token.value](x, y)
};

const funcs = {}

function evaluate(node, ast, turtle, count = 0) {
  if (node === undefined) return;
  
  if (Array.isArray(node)) {
    const newAst = new Stream(node);
    // return evaluate(newAst.next(), newAst, turtle);
    return node;
  } 
  else if (node.type === "num") return Number(node.value);
  else if (node.type == "binary") {
    const [ left, op, right ] = node.value;
    return ops[op.value](
      evaluate(left, ast, turtle, count), 
      evaluate(right, ast, turtle, count)
    );
  } else if (node.type == "symbol") {
    if (node.value === "count") return count;
    
    const args = [];
    while (ast.peek().value !== ";") {
      args.push(evaluate(ast.next(), ast, turtle, count))
      if (ast.eof()) break;
    }
    
    return funcs[node.value](args)(turtle);
  } else if (node.type == "unary") {
    console.log(node)
    // const [ left, op, right ] = node.value;
    return null;
  } else if (node.type === ";") {
    return evaluate(ast.next(), ast, turtle, count);
  } else {
    console.error("Unexpected:", node);
  }
}


//////////////////////////////////////

// const tokenRules = {
//   num: /\d+\.\d+|\d+\.|\.\d+|\d+/,
//   string: /".*"/, // how to have start, middle, end
//   // string2: [`"`, /.*/, `"`],
//   op: (word) => ["+", "-", "/", "*"].includes(char), // how did this work? word -> char
//   symbol: /[a-zA-Z][a-zA-Z\d]*/,
//   ws: /\s+/,
//   "{": "{",
//   "}": "}",
//   "[": "[",
//   "]": "]",
//   ":": ":",
//   ",": ",",
//   "\"": "\""
// }

const tokenize = makeTokenizer(tokenRules, { skip, literals });

// need optional and match anything

const string = and(
  ["\"", "symbol", "\""],
  x => ({ type: "string", value: x[1].value })
);

const number = and(["num"], x => ({ type: "number", value: Number(x[0].value) }))

const entry = s => or([
  and(["symbol", ":", p, ","], x => ({ type: "entry", key: x[0], value: x[2] })),
  and(["symbol", ":", p], x => ({ type: "entry", key: x[0], value: x[2] }))
])(s);

const e = s => or([
  and([p, "op", e], x => ({ type: "binary", value: x })),
  p
])(s)
  
const p = s => or([
  and(["op", p], x => ({ type: "unary", value: x })),
  or([ 
    and(["(", e, ")"], x => ({ type: "parens", value: x[1] }) ),
    and(["[", many(e), "]"], x => x[1]), // what about ,
  ]), 
  or([number, string, "symbol", ","])
])(s)

const parse = x => and(["{", many(entry), "}"])(x)[0];

const test = `and"`
const tokens = tokenize(test);
console.log(tokens);
const ast = convert("string2")(tokens);
console.log(ast);

const parse2 = (string) => {
  const regex = /\.add\(\w+(,)?(.*)\)/g
  const results = string.matchAll(regex);
  for (const result of results) {
    console.log(result.index);
    const toParse = result[2];
    const tokens = tokenize(toParse);
    console.log(toParse);
    const ast = parse(tokens);
    console.log(ast);
  }
}

export { parse2 }









