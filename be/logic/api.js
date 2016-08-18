/* eslint-disable no-undef */
const Router = require('koa-router');

const apiRouterhandle = new Router();

apiRouterhandle.get('/test', (ctx, next) => {
  ctx.body = 'hello api';
});

export default apiRouterhandle;