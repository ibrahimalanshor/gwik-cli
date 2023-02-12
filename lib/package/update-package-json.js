module.exports = (packageJson, updateValue) => {
  return JSON.stringify(
    Object.assign(JSON.parse(packageJson), updateValue),
    null,
    4
  );
};
