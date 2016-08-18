
const addJSON = () => {
  return async (ctx, next) => {
    ctx.json = (params) => {
      let _code = typeof params === 'number' ? params : 0;
      const _message = typeof params === 'string' ? params : '';
      let _data;
      try {
        JSON.stringify(params);
        _data = params;
      } catch (error) {
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

export { addJSON };