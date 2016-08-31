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
  const updateResult = await apiModel.update({
    _id: apiId
  }, {
      title: title,
      des: des,
      method: method,
      isHttps: isHttps,
      path: path,
      content: content,
      updateId: user._id
    });
  ctx.json();
});

apiRouterhandle.post('/team/:teamId', async (ctx, next) => {
  let {title, des, method, isHttps, path, content} = ctx.request.body;
  const {teamId} = ctx.params;
  const {user} = ctx.session;
  try {
    content = JSON.stringify(content);
  } catch (e) {
    return ctx.json(40001);
  }
  console.log(content);
  let newApi = new apiModel({
    title: title,
    des: des,
    method: method,
    isHttps: isHttps,
    path: path,
    content: content,
    teamId: teamId,
    updateId: user._id
  });
  await newApi.save();
  ctx.json(newApi);
});

export default apiRouterhandle;