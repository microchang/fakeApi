import Router from 'koa-router';
import axios from 'axios';
const authhandle = new Router();


//方便起见，将所有配置项未分离到配置文件中
const APPID = '',SECRET='';
const redirectUri = encodeURIComponent('XXX.com/auth/callback/wechat');
const PCwechatRedirectUri = `https://open.weixin.qq.com/connect/qrconnect?appid=${APPID}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_login#wechat_redirect`;

authhandle.post('/test', (ctx, next) => {
  ctx.body('test');
});

/* pc端扫码登录 */

authhandle.get('/login/pc/wechat', (ctx, next) => {
  ctx.redirect(PCwechatRedirectUri);
});

authhandle.get('/login/pc/callback/wechat',async (ctx, next) => {
  const {code} = ctx.request.query; 
  const tokenObj = await axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${APPID}&secret=${SECRET}&code=${code}&grant_type=authorization_code`);
  //some handle on tokenObj...
  const {access_token, refresh_token,openid} = tkenObj;
  const userinfo = await axios.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}`);
  //todo 获取userinfo以后登陆或者注册处理；
 
});

/* pc端扫码登录-end */






/* 微信浏览器网页授权登录 */

//理论上是针对公众号，获得用户授权进而获得用户信息，此处的token是从oauth2.0获得，无需缓存；
//步骤上和pc端扫码登陆类似；
//啊想偷个懒不想写了…… >(`_.`)>

/*  微信浏览器内部授权登录-end */



/* 微信公众号自定义菜单与消息回复 */
//此处应该分离出一个单独的授权服务器方便全局缓存token，或最少单独成一个模块。demo方便起见，不做缓存处理和错误情况处理。

authhandle.get('/Verification/wechat', (ctx, next) => {
  const {signature, timestamp, nonce, echostr};
  //处理加密以后返回，方便微信服务器进行验证。
  ctx.body = '';
});

//这块不是很熟，之前只做过接受消息或者接受地理位置，进行数据库查询然后返回结果的业务。
//消息模式是xml，使用三方xml模块解析，回复的时候拼接一个xml格式的字符串回复。


/* 微信公众号自定义菜单与消息回复-end */




/* 微信浏览器js-sdk授权 */
//token情况和微信浏览器对公众号授权类似（或者说应该从同一个token服务器获取，此处demo方便起见未做此处理）

authhandle.get('/jssdk/wechat',async (ctx, next) => {
  const tkoenObj =await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`);
  const {access_token} = tkoenObj;
  const jstickObj = await axios.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`);
  const {ticket} = jstickObj;
  //获取到ticket以后进行下一步
  const {url} = ctx.request.query;
  let signedObj = sign(ticket, url);
  delete signedObj.jsapi_ticket;
  ctx.body = signedObj;
});

/*  微信浏览器js-sdk授权-end */

export default authhandle;


//应该单独成一个模块的js-sdk相关函数，来自微信官方文件：
const createNonceStr =  () =>{
  return Math.random().toString(36).substr(2, 15);
};

const createTimestamp =  ()=> {
  return parseInt(new Date().getTime() / 1000) + '';
};

const raw =  (args)=> {
  let keys = Object.keys(args);
  keys = keys.sort();
  let newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  let string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};

/**
* @synopsis 签名算法 
*
* @param jsapi_ticket 用于签名的 jsapi_ticket
* @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
*
* @returns
*/
const sign = (jsapi_ticket, url)=> {
  let ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: createNonceStr(),
    timestamp: createTimestamp(),
    url: url
  };
  let string = raw(ret),
      jsSHA = require('jssha'),
      shaObj = new jsSHA(string, 'TEXT');
  ret.signature = shaObj.getHash('SHA-1', 'HEX');
};