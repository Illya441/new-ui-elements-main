import gulp from 'gulp';
// import webpack from 'webpack';
// import webpackStream from 'webpack-stream';
// import named from 'vinyl-named';
// import plumber from 'gulp-plumber';

// import webpackConfig from '../../webpack.config.js';
import config from '../config.js';

const { src, dest } = gulp;
const { paths } = config;

export default function Js() {
  return src(paths.js.in)
    // .pipe(plumber())
    // .pipe(named())
    // .pipe(webpackStream(webpackConfig, webpack))
    // .pipe(babel())
    .pipe(dest(paths.js.out));
}
