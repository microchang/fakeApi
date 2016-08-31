import Router from 'koa-router';
import UserModel from '../model/user';
import TeamModel from '../model/team';

import crypto from "crypto";
const userRouterhandle = new Router();
const secret = 'noppsayhammer';
userRouterhandle.get('/test', async (ctx, next) => {
  const users = await UserModel.find({});
  ctx.body = users;
});

/**
 *获取本登陆用户的所有团队
 *
 *
 */
userRouterhandle.get('/teams', async (ctx, next) => {
  const {user} = ctx.session;
  if (!user) {
    return ctx.json(40003);
  }
  const {teamsId} = user;
  console.log(user);
  const teamList = await TeamModel.find({ _id: { "$in": teamsId } });
  ctx.json(teamList);
});

/**
 *获取很多user的信息
 *
 *
 */
userRouterhandle.post('/users', async (ctx, next) => {
  
  let {userIds} = ctx.request.body;
  if (!userIds) {
    return ctx.json(40001);
  }
  userIds = userIds.split(',');
  const userList = await UserModel.find({ _id: { "$in": userIds } }, {password:0});
  ctx.json(userList);
});

//create
// userRouterhandle.post('/add', async (ctx, next) => {
//   const {username, password} = ctx.request.body;
//   console.log(username, password);
//   if (!username || !password) {
//     return ctx.json();
//   }

//   if (password.length < 6) {
//     return ctx.json();
//   }

//   const sha256Pass = crypto.createHmac('sha256', secret).update(password).digest('hex');

//   const user = new UserModel({
//     username: username,
//     password: sha256Pass,
//     teamsId: [],
//     updateTime: Date.now(),
//   });

//   let userSaveResult = await user.save();
//   console.log(typeof userSaveResult);
//   userSaveResult.password = '';
//   console.log(userSaveResult);
//   ctx.json(userSaveResult);
// });

//update
userRouterhandle.put('/:id', async (ctx, next) => {
  const allUsers = await UserModel.find({ id: ctx.params.id });
  ctx.body = allUsers;
});



export default userRouterhandle;