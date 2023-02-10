module.exports = function tokenReplace(text, data) {
  return Object.keys(data).reduce(
    (res, token) => res.replace(new RegExp(token, 'gi'), data[token]),
    text
  );
};
