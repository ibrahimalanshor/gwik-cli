exports.toCamelCase = function toCamelCase(...str) {
  return str
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');
};

exports.toPascalCase = function toPascalCase(...str) {
  return str
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};
