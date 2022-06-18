export function lSystem ({ 
    axiom, 
    rules, 
    instructions, 
    steps, 
    max, 
  }, turtle) {

  let state = typeof axiom === "string"
    ? axiom.split("")
    : axiom;

  for (let i = 0; i < steps; i++) {
    let newState = [];
    state.forEach(symbol => {
      let replacement = rules[symbol] ?? [symbol];
      if (typeof replacement === "string") replacement = replacement.split("")
      newState.push(...replacement);
    })
    
    state = newState;
  }

  const t = turtle  // ?? new Turtle();
  t.l_system_tape = state;

  state.forEach((c, i) => {
    if ((max === undefined || i < max) && instructions[c]) return instructions[c](t);
  });
  
  return t;
}