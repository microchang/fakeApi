import axios from 'axios';
import $ from 'jquery';
import LS from './localStorage.js';

export default function ajax(opts) {

  let _opts = opts;
  let _data = opts.data || {};
  _data.redirect = location.href;
  let _url = _opts.url.indexOf('http') < 0 ? 'http://localhost:14014' + opts.url : opts.url;


  _opts.url = _url;
  _opts.method = opts.method || 'get';
  _opts.withCredentials = true;
  _opts.headers = _opts.headers || {};
  _opts.headers['X-Requested-With'] = 'XMLHttpRequest';
  
  return new Promise((resolve, reject) => {
    axios(_opts).then(res => {
      if (res.status !== 200 || res.data.code == -1) {
        return location.href = '/login';
      }
      return resolve(res.data);
    }).catch(err => {
      //   alert(JSON.stringify(err));
      return reject('网络出错！');
    });
  });
}