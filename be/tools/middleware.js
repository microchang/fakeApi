

const CODE_MAP = {
  v0: '前进四！',
  v40001:'参数错误!',
  v40002: '登陆失败！',
  v40003:'权限错误',
  v40004:'找不到所需数据'
}


const cros = () => {
  return async (ctx, next) => {
    ctx.response.set('Access-Control-Allow-Origin',ctx.request.get('origin'));
    ctx.response.set('Access-Control-Allow-Credentials',true) ;
    ctx.response.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    ctx.response.set('Access-Control-Allow-Headers', 'Content-Type');
    await next();
  }
}

const addJSON = () => {
  return async (ctx, next) => {
    ctx.json = (params) => {
      params = params || 0;
      let _message, _code, _data;
      switch (typeof params) {
        case 'number':
          _code = params;
          _message = CODE_MAP['v'+_code] || '未知错误';
          _data = {};
          break;
        case 'string':
          _code = 1;
          _message = params;
          _data = {};
          break;

        case 'object':
          _code = 0;
          _message = '';
          _data = params;
          break;
        default:
          _code = 1;
          _message = '未知错误';
          _data = {};
      }
      ctx.body = {
        code: _code,
        message: _message,
        data: _data
      }
    }
    await next();
  }
}

export { addJSON ,cros};