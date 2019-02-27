const fs = require('fs');
const path = require('path');

function walk(dir = path.resolve('tests'), filelist) {
  let files = fs.readdirSync(dir);
  filelist = filelist || [];

  files.forEach((file) => {
    let isDirectory = fs.statSync(path.join(dir, file)).isDirectory();

    if (isDirectory) {
      filelist = walk(path.join(dir, file), filelist);
    } else {
      filelist.push(path.join(dir, file));
    }
  });

  return filelist;
}

walk().forEach(file => require(file));
