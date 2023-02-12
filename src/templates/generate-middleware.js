const { toCase, tokenReplace } = require('../../lib/string');

module.exports = function generateMiddleware(name) {
  const template = `exports.{function} = function {function}(req, res, next) {
  // code here

  return next();
};`;

  const data = {
    '{function}': name,
  };

  return tokenReplace(template, data);
};
