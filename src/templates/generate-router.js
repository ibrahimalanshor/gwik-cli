const { toCase, tokenReplace } = require('../../lib/string');
const { pluralize, capitalize } = require('../../lib/string');

module.exports = function generateRouter(name) {
  const template = `const { Router } = require('gwik');
const {controller} = require('./{controller-file}.controller');

module.exports = [
    new Router('/{path}').get({controller}.{handle}).build()
];`;

  const data = {
    '{controller}': toCase.toPascalCase(capitalize(name), 'controller'),
    '{controller-file}': name,
    '{path}': pluralize(name),
    '{handle}': toCase.toCamelCase('get', pluralize(name)),
  };

  return tokenReplace(template, data);
};
