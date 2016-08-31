

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import session from "koa-session2";
import convert from 'koa-convert';
import userRouterhandle from './logic/user';
import teamRouterhandle from './logic/team';
import apiRouterhandle from './logic/api';
import authRouterhander from './logic/auth';
import {addJSON,cros} from './tools/middleware';
import Store from './tools/store';
import conf from './configs/config';
const app = new Koa();
const allRouter = new Router();

app.keys =conf.appKey;

//route setter
allRouter.use('/user', userRouterhandle.routes(), userRouterhandle.allowedMethods());
allRouter.use('/team', teamRouterhandle.routes(), teamRouterhandle.allowedMethods());
allRouter.use('/api', apiRouterhandle.routes(), apiRouterhandle.allowedMethods());
allRouter.use('/auth', authRouterhander.routes(), authRouterhander.allowedMethods());


app
  //日志处理-todo
  .use(async (ctx, next) => {
    const start = new Date;
    console.log(`\x1b[36m>>\x1b[0m [ \x1b[32m${ctx.method}\x1b[0m] -- [\x1b[32m${ctx.url}\x1b[0m] --[\x1b[32m${(new Date()).toString()}\x1b[0m]`);
    await next();
    const ms = new Date - start;
    console.log(`\x1b[36m<<\x1b[0m [ \x1b[32m${ctx.method}\x1b[0m] -- [\x1b[32m${ctx.url}\x1b[0m] --[\x1b[32m${(new Date()).toString()}\x1b[0m] , ${ms} ms`);
  })
  .use(cros())
  .use(addJSON())
  .use(bodyParser())
  .use(session({
    key: conf.session.key,
    store: new Store(),
    maxAge:conf.session.maxAge
  }))
  .use(allRouter.routes())

  //404处理-todo
  .use((ctx, next) => {
    ctx.json(404);
  })

//错误处理-todo
app.on('error', function (err) {
  console.log('server error', err);
});

app.listen(conf.port);
