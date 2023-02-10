const { toCase, tokenReplace } = require('../../lib/string');
const { pluralize } = require('../../lib/string');

module.exports = function generateController(name) {
  const template = `exports.{function} = function {function}() {
  return {return};
};`;

  const data = {
    '{function}': toCase.toCamelCase('get', pluralize(name)),
    '{return}': `[]`,
  };

  return tokenReplace(template, data);
};
