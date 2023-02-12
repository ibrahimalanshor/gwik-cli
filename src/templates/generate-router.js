const { toCase, tokenReplace } = require('../../lib/string');
const { pluralize, capitalize } = require('../../lib/string');

function baseRouter(name, options = {}) {
  const method = options.method || 'get';
  const action = options.action || 'get';
  const params = options.params || '';

  const template = `new Router('/{path}').{method}({controller}.{handle}).build()`;

  const data = {
    '{controller}': options.template['{controller}'],
    '{path}': options.template['{path}'] + params,
    '{handle}': toCase.toCamelCase(action, ...pluralize(name).split(' ')),
    '{method}': method,
  };

  return tokenReplace(template, data);
}

function crudRouter(name, options) {
  const actions = {
    get: {
      method: 'get',
    },
    create: {
      method: 'post',
    },
    find: {
      method: 'get',
      params: '/:id',
    },
    update: {
      method: 'patch',
      params: '/:id',
    },
    delete: {
      method: 'delete',
      params: '/:id',
    },
  };

  return Object.entries(actions).reduce(
    (res, [action, method], index, array) => {
      return (res +=
        baseRouter(name, {
          action,
          method: method.method,
          params: method.params,
          template: options.template,
        }) + (index !== array.length - 1 ? ',\n  ' : ''));
    },
    ''
  );
}

module.exports = function generateRouter(name, normalModuleName, options = {}) {
  const template = `const { Router } = require('gwik');
const {controller} = require('./{controller-file}.controller');

module.exports = [
  {content}
];`;

  const data = {
    '{controller}': toCase.toPascalCase(
      ...capitalize(normalModuleName).split(' '),
      'controller'
    ),
    '{controller-file}': name,
    '{path}': pluralize(name),
    '{content}': '',
  };

  if (options.type === 'crud') {
    data['{content}'] = crudRouter(normalModuleName, { template: data });
  } else {
    data['{content}'] = baseRouter(normalModuleName, { template: data });
  }

  return tokenReplace(template, data);
};
