module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        "targets": {
          "node": 12 // because AWS by default runs node 12 on lambda
        }
      }
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-transform-runtime'
  ]
};