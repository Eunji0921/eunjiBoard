module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/env", {modules: false}
    ]
  ];
  const plugins = ["lodash", "@babel/plugin-syntax-dynamic-import"];

  return {
    presets,
    plugins
  };
}
