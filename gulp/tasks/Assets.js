import gulp from 'gulp';

const { src, dest } = gulp;

export default function Assets(paths) {
  const dst = paths.out;

  return src(paths.assets)
    .pipe(dest((file) => {
      let baseDir = dst;
      if (/fonts$/.test(file.base)) {
        baseDir = `${dst}fonts`;
      }
      if (/json$/.test(file.base)) {
        baseDir = `${dst}json`;
      }
      if (/videos$/.test(file.dirname)) {
        baseDir = `${dst}videos`;
      }
      if (/ajax$/.test(file.dirname)) {
        baseDir = `${dst}ajax`;
      }
      if (/css$/.test(file.dirname)) {
        baseDir = `${dst}css`;
      } else if (file.extname === '.css') {
        baseDir = `${dst}css/vendor`;
      }
      return baseDir;
    }));
}
