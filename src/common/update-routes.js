module.exports = function updateRoutes(existsingRoutes, moduleDir) {
  const routes = existsingRoutes;
  const template = `...require('./modules/${moduleDir}/${moduleDir}.routes'),`;

  if (!routes.trim().length) {
    return 'module.exports = [\n\t' + template + '\n]';
  }

  const closeBrackendEnd = routes.lastIndexOf(']');
  const firstRouteIndex = routes.indexOf('[') + 1;
  const lastRouteIndex = closeBrackendEnd - 1;
  const firstRouteStartChar = routes.charAt(firstRouteIndex);
  const lastRouteStartChar = routes.charAt(lastRouteIndex);
  const newLineBeforeFirstRoute = firstRouteStartChar === '\n';
  const newLineBeforeLastRoute = lastRouteStartChar === '\n';

  console.log(
    firstRouteStartChar === '\t',
    newLineBeforeFirstRoute,
    newLineBeforeLastRoute
  );
  // const lastRouteEndChar = routes.charAt(squareBracketCloseIndex - 1)
  // const lastRouteEndCharHasNewLine = lastRouteEndChar === '\n'
  // const lastRouteEndCharHasComma = lastRouteEndChar - 1 === ','
  // const firstRouteStartCharHasNewLine = firstRouteStartChar === '\n'

  // // return routes.slice(0, firstRouteStartChar)
  // //   + (firstRouteStartCharHasNewLine ? '\n\t' : '')
  // //   + routes.slice(firstRouteStartChar + 1, squareBracketCloseIndex)
  // //   + (!lastRouteEndCharHasComma ? ',' : '')
  // //   + (lastRouteEndCharHasNewLine ? '\t' : '\n\t')
  // //   + template + '\n]'

  // console.log(lastRouteEndChar, lastRouteEndCharHasComma, lastRouteEndCharHasNewLine)

  // console.log(routes.slice(0, squareBracketOpenIndex + 1)
  // + (!firstRouteStartCharHasNewLine ? '\n\t' : '')
  // + routes.slice(squareBracketOpenIndex + 1, squareBracketCloseIndex - 1)
  // + (lastRouteEndCharHasNewLine
  //   ? (!lastRouteEndCharHasComma ? ',\t' : '\t') : '\n\t')
  // + '\n\t'
  // + template + '\n]')

  console.log(
    routes.slice(0, firstRouteIndex) +
      routes.slice(firstRouteIndex, closeBrackendEnd) +
      '\t' +
      template +
      '\n]'
  );

  return existsingRoutes;
};
