const pathIn = 'html/src/';
const pathOut = 'html/build/';
const pathLibs = 'html/libs/';

export default {
  paths: {
    in: pathIn,
    out: pathOut,
    libs: `${pathLibs}**/*`,
    img: {
      in: `${pathIn}img/**/*`,
      out: `${pathOut}img/`,
    },
    js: {
      in: `${pathIn}js/**/*`,
      includes: `${pathIn}_js-includes/**/*.m?js`,
      out: `${pathOut}js/`,
    },
    sass: {
      in: `${pathIn}_sass/*.scss`,
      out: `${pathOut}css/`,
      watch: `${pathIn}_sass/**/*`,
    },
    jekyll: {
      in: [`${pathIn}**/*.liquid`, `${pathIn}_data/**/*`],
      temp: 'html/temp/**/*.liquid',
      tempDir: 'html/temp/',
    },
    svgIcons: 'html/sprite/svg-sprite',
    assets: [
      `${pathIn}*.html`,
      `${pathLibs}**/*`,
      // `${pathIn}js/**/*`,
      `${pathIn}json/**/*`,
      `${pathIn}css/*.*`,
      `${pathIn}videos/*.*`,
    ],
  },
  sassCfg: {
    // outputStyle: 'expanded',
    outputStyle: 'compressed',
    precision: 2,
    indentType: 'space',
    indentWidth: 2,
    linefeed: 'lf',
    includePaths: ['node_modules'],
    errLogToConsole: true,
  },
  svgSpriteCfg: {
    shape: {
      transform: [
        {
          svgo: {
            plugins: [
              { convertStyleToAttrs: false },
              { removeViewBox: false },
              { removeUnusedNS: false },
              { removeUselessStrokeAndFill: true },
              // { removeEditorsNSData: false },
              { cleanupIDs: false },
              { removeComments: true },
              { removeEmptyAttrs: true },
              { removeEmptyText: true },
              { collapseGroups: true },
              { removeAttrs: { attrs: '(fill|stroke)' } },
            ],
          },
        },
      ],
    },
    mode: {
      symbol: {
        sprite: '../sprite.svg',
        render: {
          scss: {
            dest: '../../../../src/_sass/_svg-sprite.scss',
            template: 'html/sprite/_sprite_template.scss',
          },
        },
      },
    },
  },
};
