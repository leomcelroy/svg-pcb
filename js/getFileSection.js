export function getFileSection(sectionName, program) {
  const re = new RegExp(`\\/\\*\\s*--\\s*${sectionName}\\s*--\\s*\\*\\/`, 'g')

  const matches = program.matchAll(re);
  const match = matches.next();

  return match.value !== undefined
    ? match.value.index + match.value[0].length + 1
    : null;
}