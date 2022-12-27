function checkBlacklist(string) {
  // poor attempt at sanitizing

  const BLACK_LISTED_WORDS = []; // import, document, window, localStorage
  BLACK_LISTED_WORDS.forEach(word => {
    if (string.includes(word))
      throw `"${word}" is not permitted due to security concerns.`;
  });
}