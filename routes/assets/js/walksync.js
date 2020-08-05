const fs = require('fs');

// verify needed
// https://gist.github.com/kethinov/6658166
// https://www.npmjs.com/package/globby
const walkSync = (dir, filelist) => {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    } else {
      filelist.push(file);
    }
  });
  return filelist;
};

module.exports = {
  walkSync,
}
