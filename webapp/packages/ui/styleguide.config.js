const Path = require('path');

module.exports = {
  components: 'src/**/*.guide.tsx',
	webpackConfig: require(Path.join(__dirname, 'webpack.config.js')),
	pagePerSection: true,

	styleguideComponents: {
    Logo: Path.join(__dirname, 'styleguide/components/Logo.tsx'),
    StyleGuideRenderer: Path.join(__dirname, 'styleguide/components/Renderer.tsx'),
    Wrapper: Path.join(__dirname, 'styleguide/components/ExampleWrapper.tsx'),
  },

  sections: [
    {
      name: 'Theme',
      content: 'src/theme/Theme.md',
      components: 'src/theme/**/*.guide.tsx',
    },
    {
      name: 'Layout',
      components: 'src/layout/**/*.guide.tsx'
    },
    {
      name: 'Texts',
      components: 'src/texts/**/*.guide.tsx'
    },
    {
      name: 'Forms',
      components: 'src/forms/**/*.guide.tsx'
    },
    {
      name: 'Buttons',
      components: 'src/buttons/**/*.guide.tsx'
    },
    {
      name: 'Icons',
      components: 'src/icons/**/*.guide.tsx'
    },
    {
      name: 'Content',
      components: 'src/content/**/*.guide.tsx'
    },
    {
      name: 'Popovers',
      components: 'src/popovers/**/*.guide.tsx'
    },
    {
      name: "Behaviors",
      components: 'src/behaviors/**/*.guide.tsx'
    }
  ]
};