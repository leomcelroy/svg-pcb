export function modifyAST(string, changes) {
  let result = [];
  let min = 0;
  changes.sort((a, b) => a.from - b.from);
  
  changes.forEach(change => {
    const { from, to, insert } = change;

    result.push(string.substr(min, from-min));
    result.push(insert);
    min = (to !== undefined ? to : from);
  });

  result.push(string.substr(min));

  if (result.length > 0) string = result.join("");

  return string;
}