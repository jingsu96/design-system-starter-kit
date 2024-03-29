const { BUILD_PATH, DARK, PREFIX } = require('../const/index.cjs');
const { cssTransforms, getDefaultFileConfig, getBaseFileConfig, jsTransforms } = require('../configs/base.cjs');
const { webTransforms } = require('../configs/transforms.cjs');
const { webFormats } = require('../configs/formats.cjs');

function getThemeSelector(theme) {
  return `html[data-theme="${theme}"], .your-design-system-${theme}`;
}

function getWebConfig(theme) {
  const notDefaultTheme = theme !== DARK;
  const THEME_PATH = `${BUILD_PATH}${theme}/`;

  return {
    theming_css: {
      transformGroup: webTransforms.css,
      transforms: cssTransforms,
      prefix: PREFIX,
      buildPath: notDefaultTheme ? `${BUILD_PATH}/themes/` : `${BUILD_PATH}css/`,
      files: [
        {
          ...getDefaultFileConfig(theme),
          format: webFormats.cssVars,
          destination: notDefaultTheme ? `${theme}.css` : 'variables.css',
          options: {
            selector: notDefaultTheme ? getThemeSelector(theme) : null,
          },
        },
      ],
    },
    css: {
      transformGroup: webTransforms.css,
      buildPath: `${BUILD_PATH}css/`,
      prefix: PREFIX,
      files: [
        {
          ...getBaseFileConfig(),
          format: webFormats.cssVars,
          destination: 'base_variables.css',
        },
      ],
    },
    theming_scss: {
      transformGroup: webTransforms.scss,
      transforms: cssTransforms,
      buildPath: `${BUILD_PATH}scss/`,
      prefix: PREFIX,
      files: [
        {
          ...getDefaultFileConfig(theme),
          destination: `_${theme}-variables.scss`,
          format: webFormats.scss,
        },
      ],
    },
    scss: {
      transformGroup: webTransforms.scss,
      buildPath: `${BUILD_PATH}scss/`,
      prefix: PREFIX,
      files: [
        {
          ...getBaseFileConfig(),
          destination: `_base-variables.scss`,
          format: webFormats.scss,
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    theming_es: {
      transformGroup: webTransforms.es,
      transforms: jsTransforms,
      buildPath: notDefaultTheme ? THEME_PATH : BUILD_PATH,
      prefix: PREFIX,
      files: [
        {
          ...getDefaultFileConfig(theme),
          destination: notDefaultTheme ? `${theme}.mjs` : 'wrapper.mjs',
          format: webFormats.es6,
        },
      ],
    },
    es: {
      transformGroup: webTransforms.es,
      transforms: jsTransforms,
      buildPath: BUILD_PATH,
      prefix: PREFIX,
      files: [
        {
          ...getBaseFileConfig(),
          destination: 'base_wrapper.mjs',
          format: webFormats.es6,
        },
      ],
    },
    cjs: {
      transformGroup: webTransforms.cjs,
      transforms: jsTransforms,
      buildPath: notDefaultTheme ? THEME_PATH : BUILD_PATH,
      prefix: PREFIX,
      files: [
        {
          ...getDefaultFileConfig(theme),
          destination: notDefaultTheme ? `${theme}.cjs` : 'index.cjs',
          format: webFormats.cjs,
        },
      ],
    },
    ts: {
      transformGroup: webTransforms.ts,
      transforms: jsTransforms,
      buildPath: notDefaultTheme ? THEME_PATH : BUILD_PATH,
      prefix: PREFIX,
      files: [
        {
          ...getDefaultFileConfig(theme),
          destination: notDefaultTheme ? `${theme}.d.ts` : 'index.d.ts',
          format: webFormats.tsDeclarations,
        },
      ],
    },
    metaJS: {
      transformGroup: webTransforms.es,
      transforms: jsTransforms,
      prefix: PREFIX,
      buildPath: `${BUILD_PATH}meta/`,
      files: [
        {
          ...getDefaultFileConfig(theme),
          destination: 'cssProperties.mjs',
          format: 'js/token-data',
        },
        {
          ...getDefaultFileConfig(theme),
          destination: 'cssProperties.js',
          format: 'common/token-data',
        },
        {
          ...getDefaultFileConfig(theme),
          destination: 'normalize.json',
          format: 'json/token-normalize',
        },
      ],
    },
    metaTS: {
      transformGroup: webTransforms.ts,
      transforms: jsTransforms,
      buildPath: `${BUILD_PATH}meta/`,
      prefix: PREFIX,
      files: [
        {
          ...getDefaultFileConfig(theme),
          destination: 'cssProperties.d.ts',
          format: webFormats.tsDeclarations,
        },
      ],
    },
  };
}

module.exports = {
  getWebConfig,
};
