import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssFix from 'postcss-fixes';
import sortMediaQueries from 'postcss-sort-media-queries';
// import perfectionist from 'perfectionist';
import replace from 'gulp-replace';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';

import config from '../config.js';

const { src, dest } = gulp;
const sass = gulpSass(dartSass);
const { paths, sassCfg } = config;

export default function scss() {
  /* const perfOpt = {
    indentSize: 2,
    cascade: false,
  }; */

  const postCssOpt = [
    cssFix({ preset: 'safe' }),
    autoprefixer({
      grid: true,
      cascade: false,
    }),
    sortMediaQueries({
      sort: 'mobile-first',
    }),
    // perfectionist(perfOpt),
  ];

  return src(paths.sass.in, { sourcemaps: true })
    .pipe(replace('@import "~', '@import "'))
    .pipe(
      sass(sassCfg)
        .on('error', notify.onError({
          title: 'Sass Error!',
          message: '<%= error.message %>',
          sound: 'Beep',
        })),
    )
    .pipe(postcss(postCssOpt))
    .pipe(dest(paths.sass.out, { sourcemaps: './maps' }))
    .pipe(browserSync.stream());
}
