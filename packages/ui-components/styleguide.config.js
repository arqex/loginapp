const Path = require('path');

module.exports = {
  components: 'src/**/*.tsx',
	webpackConfig: require(Path.join(__dirname, 'webpack.config.js')),

	styleguideComponents: {
    Logo: Path.join(__dirname, 'styleguide/components/Logo.tsx'),
    StyleGuideRenderer: Path.join(__dirname, 'styleguide/components/Renderer.tsx'),
  }
};