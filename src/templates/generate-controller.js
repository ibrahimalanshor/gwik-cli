const { toCase, tokenReplace } = require('../../lib/string');
const { pluralize } = require('../../lib/string');

function baseController(name, options = {}) {
  const action = options.action || 'get';
  const returnData = options.return || '[]';

  const template = `exports.{function} = function {function}() {
  return {return};
};`;

  const data = {
    '{function}': toCase.toCamelCase(action, ...pluralize(name).split(' ')),
    '{return}': returnData,
  };

  return tokenReplace(template, data);
}

function crudController(name) {
  const actions = {
    get: '[]',
    create: '{}',
    find: '{}',
    update: '{}',
    delete: '{}',
  };

  return Object.entries(actions).reduce((res, [action, returnData]) => {
    return (res += baseController(name, { action, return: returnData }) + '\n');
  }, '');
}

module.exports = function generateController(name, options = {}) {
  if (options.type === 'crud') {
    return crudController(name);
  }

  return baseController(name, options);
};
