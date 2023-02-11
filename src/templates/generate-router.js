const { toCase, tokenReplace } = require('../../lib/string');
const { pluralize, capitalize } = require('../../lib/string');

module.exports = function generateRouter(name, normalModuleName) {
  const template = `const { Router } = require('gwik');
const {controller} = require('./{controller-file}.controller');

module.exports = [
    new Router('/{path}').get({controller}.{handle}).build()
];`;

  const data = {
    '{controller}': toCase.toPascalCase(
      ...capitalize(normalModuleName).split(' '),
      'controller'
    ),
    '{controller-file}': name,
    '{path}': pluralize(name),
    '{handle}': toCase.toCamelCase(
      'get',
      ...pluralize(normalModuleName).split(' ')
    ),
  };

  return tokenReplace(template, data);
};
