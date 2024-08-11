module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      ['@babel/preset-react', { pragma: 'h', pragmaFrag: 'Fragment' }]
    ],
    plugins: [
      '@babel/plugin-transform-runtime'
    ]
  };
};
