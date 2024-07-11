/* eslint-disable import/extensions */
import gulp from 'gulp';
import { deleteAsync } from 'del';

// Tasks import
import browserSync, { bsReload } from './gulp/tasks/browserSync.js';
import OptimizeImg from './gulp/tasks/OptimizeImg.js';
import SvgSprite from './gulp/tasks/SvgSprite.js';
import Assets from './gulp/tasks/Assets.js';
import Scss from './gulp/tasks/Scss.js';
import Js from './gulp/tasks/Js.js';
import JekyllHtml from './gulp/tasks/JekyllHtml.js';

import config from './gulp/config.js';

const { parallel, series, watch } = gulp;
const { paths } = config;

function clean() {
  return deleteAsync([`${paths.out}**`, `${paths.jekyll.tempDir}**`]);
}

function serve() { browserSync(); }
function assets() { return Assets(paths); }
function optimizeImg() { return OptimizeImg(paths); }
function spriteSvg() { return SvgSprite(); }
function js() { return Js(); }
function htmlProc(done) {
  JekyllHtml();
  done();
}

function startWatch() {
  watch(`${paths.img.in}.*`, optimizeImg);
  watch(`${paths.svgIcons}/*.svg`, spriteSvg);
  watch(paths.sass.watch, Scss);
  watch([paths.js.in, paths.js.includes], series(js, bsReload));
  watch(paths.jekyll.in, htmlProc);
  watch(paths.assets, series(assets, bsReload));
}

const build = series(
  clean,
  spriteSvg,
  parallel(
    optimizeImg,
    Scss,
    js,
    htmlProc,
    assets,
  ),
  // htmlProc,
  // criticalCss,
);

const dev = series(
  build,
  parallel(
    serve,
    startWatch,
  ),
);

export {
  clean,
  optimizeImg,
  js,
  Scss,
  // htmlProc,
  build,
  dev,
};

export default dev;
