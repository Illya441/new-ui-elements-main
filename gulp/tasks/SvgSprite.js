import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpSVGSprite from 'gulp-svg-sprite';

import config from '../config.js';

const { src, dest } = gulp;
const { paths, svgSpriteCfg } = config;

export default function SvgSprite() {
  console.log('*****************************');
  console.log(`${paths.svgIcons}/*.svg`);
  return src(`${paths.svgIcons}/*.svg`)
  // .pipe(plumber())
    /* .pipe(svgmin({
      js2svg: {
        pretty: true,
      },
    }))
    .pipe(cheerio({
      run(_) {
        // _('[fill]').removeAttr('fill');
        _('[stroke]').removeAttr('stroke');
        // _('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true },
    })) */
    // .pipe($.replace('&gt;', '>'))
    .pipe(gulpSVGSprite(svgSpriteCfg))
    .on('error', (error) => { console.log(error); })
    .pipe(dest(`${paths.img.out}2024/`))
    .pipe(browserSync.stream());
}
