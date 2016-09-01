/* eslint-disable no-undef */
import Router from 'koa-router';
const apiRouterhandle = new Router();
import apiModel from '../model/api';
import mongoose from 'mongoose';

apiRouterhandle.get('/test', (ctx, next) => {
  ctx.body = 'hello api';
});

apiRouterhandle.get('/:id', async (ctx, next) => {

  const api = await apiModel.findById(ctx.params.id);
  if (!api) {
    return ctx.json(40004);
  }
  ctx.json(api);
});

apiRouterhandle.get('/team/:teamId', async (ctx, next) => {
  const apiList = await apiModel.find({ teamId: ctx.params.teamId });
  ctx.json(apiList);
});

apiRouterhandle.delete('/:apiId', async (ctx, next) => {

  const {apiId} = ctx.params;
  const {user } = ctx.session;
  const api = await apiModel.findById(apiId);

  if (!api) {
    return ctx.json(40004);
  }
  if (user.teamsId.toString().indexOf(api.teamId) < 0) {
    return ctx.json(40003);
  }
  await api.remove();
  ctx.json();
});

apiRouterhandle.put('/:apiId', async (ctx, next) => {
  let {title, des, method, isHttps, path, content} = ctx.request.body;
  const {apiId} = ctx.params;
  const {user } = ctx.session;
  const api = await apiModel.findById(apiId);

  if (!api) {
    return ctx.json(40004);
  }
  if (user.teamsId.toString().indexOf(api.teamId) < 0) {
    return ctx.json(40003);
  }
  try {
    content = JSON.stringify(content);
  } catch (e) {
    return ctx.json(40001);
  }

  api.title = title;
  api.des = des;
  api.method = method;
  api.isHttps = isHttps;
  api.path = path;
  api.content = content;
  api.updateId = user._id;
  await api.save();
  ctx.json();
});

apiRouterhandle.post('/team/:teamId', async (ctx, next) => {
  let {title, des, method, isHttps, path, content,teamCode} = ctx.request.body;
  const {teamId} = ctx.params;
  const {user} = ctx.session;
  if (!teamId) {
    return crx.json(40001);
  }
  try {
    content = JSON.stringify(content);
  } catch (e) {
    return ctx.json(40001);
  }
  let newApi = new apiModel({
    title: title,
    des: des,
    method: method,
    isHttps: isHttps,
    path: path,
    content: content,
    teamId: teamId,
    teamCode:teamCode,
    updateId: user._id
  });
  await newApi.save();
  ctx.json(newApi);
});

apiRouterhandle.all('*', async (ctx, next) => {

  let url = ctx.originalUrl.split('/');
  url=url.slice(1, url.length);
  if (url[0] !== 'api' || url[1] !== 'r') {
    return await next();
  }
  const path = url.slice(3, url.length).join('/');
  const apis = await apiModel.find({
    teamCode: url[2],
    path: path
  });
  if (apis.length === 0) {
    return ctx.json(40004);
  }
  const httpList = ['ALL', 'GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH'];
  if (apis[0].method && ctx.request.method.toUpperCase() !== httpList[apis[0].method]) {
    return ctx.json('HTTP方式不相配');
  }
  ctx.body = apis[0].content;
})

export default apiRouterhandle;