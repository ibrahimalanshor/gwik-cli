module.exports = function updateRoutes(existsingRoutes, moduleDir) {
  const template = `...require('./modules/${moduleDir}/${moduleDir}.routes'),`;

  if (!existsingRoutes.trim().length) {
    return 'module.exports = [\n\t' + template + '\n]';
  }

  const openBracketIndex = existsingRoutes.indexOf('[');
  const closeBrackendIndex = existsingRoutes.lastIndexOf(']');
  const lastCommaIndex = existsingRoutes.lastIndexOf(',');
  const routes = existsingRoutes.slice(
    openBracketIndex,
    closeBrackendIndex + 1
  );
  const endIndex = lastCommaIndex !== -1 ? lastCommaIndex : closeBrackendIndex;
  const emptyRoutes = !/[\w\d]/gim.test(routes.trim());

  return (
    existsingRoutes.slice(0, endIndex) +
    (!emptyRoutes ? ',' : '') +
    '\n\t' +
    template +
    '\n]'
  );
};
