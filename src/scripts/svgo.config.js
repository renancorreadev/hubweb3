module.exports = {
    plugins: [
      'preset-default',
      'removeDimensions',
      {
        name: 'removeAttrs',
        params: { attrs: '(width|height)' }
      }
    ]
  };