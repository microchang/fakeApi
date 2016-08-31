let base = require('./base.json');
let dev = require('./dev.json');
let test = require('./test.json');
let prod = require('./prod.json');
// import base from './base.json';
const NODE_ENV = process.env.NODE_ENV || 'dev';

if (typeof Object.assign != 'function') {
  Object.assign = function (target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}
let conf;
switch (NODE_ENV) {
case 'dev':
  conf = Object.assign({}, base, dev);
  break;
case 'test':
  conf = Object.assign({}, base, test);
  break;
case 'prod':
  conf = Object.assign({}, base, prod);
  break;
}

module.exports = conf;