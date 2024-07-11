import gulp from 'gulp';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import gifsicle from 'imagemin-gifsicle';
import svgo from 'imagemin-svgo';
import imageminPngquant from 'imagemin-pngquant';
import imageminJpegRecompress from 'imagemin-jpeg-recompress';
import browserSync from 'browser-sync';

const { src, dest } = gulp;

export default function optimizeImg(paths) {
  const srcPath = paths.img.in;
  const dstPath = paths.img.out;

  return src(srcPath)
    .pipe(changed(dstPath))
    .pipe(imagemin([
      gifsicle({ interlaced: true }),
      svgo({
        plugins: [
          {
            name: 'preset-default',
            params: { overrides: { removeViewBox: false, cleanupIDs: false } },
          },
        ],
      }),
      imageminPngquant({
        quality: [0.3, 0.6],
        strip: true,
        speed: 1,
      }),
      imageminJpegRecompress({
        progressive: true,
        max: 55,
        min: 40,
      }),
    ]))
    .pipe(dest(dstPath))
    .pipe(browserSync.stream());
}
