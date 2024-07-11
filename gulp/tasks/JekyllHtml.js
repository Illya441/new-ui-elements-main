import { spawn } from 'node:child_process';
import gulp from 'gulp';
import rename from 'gulp-rename';
import useref from 'gulp-useref';
import htmlBeautify from 'gulp-html-beautify';
import browserSync from 'browser-sync';

import config from '../config.js';

const { src, dest, series } = gulp;
const { paths } = config;

function jekyll(done) {
  const jekyllCmd = /windows/i.test(process.env.OS) ? 'jekyll.bat' : 'jekyll';
  console.log(jekyllCmd);
  return spawn(jekyllCmd, ['build'], { stdio: 'inherit' })
    .on('exit', done);
}

function html() {
  const userefOpts = {
    newLine: '\n/* ** next library ************************* */\n',
  };

  return src(paths.jekyll.temp)
    .pipe(rename({
      extname: '',
    }))
    .pipe(useref(userefOpts))
    .pipe(htmlBeautify())
    .pipe(dest(paths.out))
    .pipe(browserSync.stream());
}

export default series(jekyll, html);
