// function flatten(items) {
//   const flat = [];

//   items.forEach(item => {
//     if (Array.isArray(item)) {
//       flat.push(...flatten(item));
//     } else {
//       flat.push(item);
//     }
//   });

//   return flat;
// }

function flatten(arr) {
  var result = [];
  var stack = arr, first;

  while (stack.length > 0) {
    first = stack[0];

    if (Array.isArray(first)) {
      // Replace the nested array with its items
      Array.prototype.splice.apply(stack, [0, 1].concat(first));
    } else {
      result.push(first);
      // Delete the first item
      stack.splice(0, 1);
    }
  }

  return result;
}

export function points(turtle) {
	return flatten(turtle.pathMap(x => x.points));
}