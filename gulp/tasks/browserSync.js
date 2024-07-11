import bSync from 'browser-sync';

export function bsReload(cb) {
  bSync.reload();
  cb();
}

export default function browserSync() {
  bSync.init({
    server: {
      baseDir: 'html/build',
      directory: true,
    },
    port: 3030,
    notify: false,
    online: true,
    ghostMode: false,
    logFileChanges: true,
    logLevel: 'debug',
    open: false,
  });
}
