// const arg = process.argv.splice(2);
const ENVFILE = require(__dirname + '/env.json');
const BUCKET = ENVFILE.OSS_BUCKET;
const FILE_DIR = ENVFILE.OSS_FILE_DIR;
const KID = ENVFILE.OSS_KEY;
const KSE = ENVFILE.OSS_SECRET;
const END_POINT = ENVFILE.OSS_END_POINT;
console.log('bucket', BUCKET);
console.log('file dir', FILE_DIR);
console.log('key id', KID);
console.log('key secret', KSE);
console.log('end point', END_POINT);
// const APP_PLATFORM = arg[0];
// const APP_ENV = arg[1];
// console.log('打包平台为：', APP_PLATFORM);
// console.log('打包环境为：', APP_ENV);
// let rootPath = APP_PLATFORM || '';
// if (APP_ENV) {
//   rootPath += '/' + APP_ENV;
// }
// rootPath += '/static/';
// console.log('文件根目录为：', rootPath);
// return;
var OSS = require('ali-oss')
var async = require('async');

var fs = require('fs');
var path = require('path');

function travel(dir, callback) {
  fs.readdirSync(dir).forEach(function (file) {
    var pathname = path.join(dir, file);

    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback);
    } else {
      callback(pathname);
    }
  });
}

var files = [];
travel('./dist', (pathname) => {
  files.push(pathname);
});

// window斜杠替换
if (process.platform === 'win32') {
  files = files.map((e) => e.replace(/\\/g, '/'));
}

var client = new OSS({
  // region: 'oss-cn-hangzhou',
  accessKeyId: KID,
  accessKeySecret: KSE,
  endpoint: END_POINT,
  bucket: BUCKET,
  timeout: 60000
  // internal: true
});

var okNum = 0,
  failNum = 0;
async.eachOfSeries(files, function (file, index, done) {
  client.put(FILE_DIR + file, file).then(function (val) {
    console.log(file + ':' + val.res.status);
    okNum++;
    done(null);
  }).catch(function (err) {
    console.log(index + ':upload fail');
    failNum++;
    done(err);
  })
}, function (err) {
  console.log('upload success:' + okNum);
  console.log('upload fail:' + failNum);
  if (err) {
    console.log(err);
  }
});

