module.exports = function updateExports(existing, name, path) {
  return existing + `exports.${name} = require('${path}')\n`;
};
