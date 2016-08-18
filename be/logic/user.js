import Router from 'koa-router';
import UserModel from '../model/user';
import crypto from "crypto";
const userRouterhandle = new Router();
const secret = 'noppsayhammer';
userRouterhandle.get('/test', async (ctx, next) => {
  const users = await UserModel.find({});
  ctx.body = users;
});

//get
userRouterhandle.get('/all', async (ctx, next) => {
  const allUsers = await UserModel.find();
  ctx.body = allUsers;
});

//get
userRouterhandle.get('/:id', async (ctx, next) => {
  const allUsers = await UserModel.find({ id: ctx.params.id });
  ctx.body = allUsers;
});

//create
userRouterhandle.post('/add', async (ctx, next) => {
  const {username, password} = ctx.request.body;
  console.log(username, password);
  if (!username || !password) {
    return ctx.json();
  }

  if (password.length < 6) {
    return ctx.json();
  }

  const sha256Pass = crypto.createHmac('sha256', secret).update(password).digest('hex');
  console.log(sha256Pass);

  const user = new UserModel({
    username: username,
    password: sha256Pass,
    teamsId: [],
    updateTime: Date.now(),
  });
   
  let userSaveResult = await user.save();
  console.log(typeof userSaveResult);
  userSaveResult.password = '';
  console.log(userSaveResult);
  ctx.json(userSaveResult);
});

//update
userRouterhandle.post('/:id', async (ctx, next) => {
  const allUsers = await UserModel.find({ id: ctx.params.id });
  ctx.body = allUsers;
});



export default userRouterhandle;