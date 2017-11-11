const path = require('path');
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);
  // Extend it as you need.
  // For example, add typescript loader:
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('ts-loader')
  });

  config.module.rules.push({
    test: /\.(m4a)$/,
    loader: require.resolve('ignore-loader')
  });

  config.module.rules.push({
    test: /\.scss$/,
    loaders: ["style-loader", "css-loader", { loader: "sass-loader", options: {
      includePaths: [path.resolve(__dirname, '..', '..', 'node_modules'), path.resolve(__dirname, '..', '..', 'src')]
    }}],
  });

  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.extensions.push('.m4a');
  config.resolve.extensions.push('.css', '.scss');
  return config;
};