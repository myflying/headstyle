var util = require('md5.js');

var S4 = function () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

var guid = function() {
  return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
};

var md5Sign = function(times, random) {
  let temp = 'gxtx'.concat('/').concat(times).concat('/').concat(random)
  let md5String = util.md5(temp).toLowerCase();
  return md5String
};

module.exports.guid = guid
module.exports.md5Sign = md5Sign