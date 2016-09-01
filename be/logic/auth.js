import Router from 'koa-router';
import crypto from "crypto";
import UserModel from '../model/user';
const authhandle = new Router();
const secret = 'noppsayhammer';

authhandle.get('/test', (ctx, next) => {
  ctx.session.user = 'sdfsdf';
  ctx.json('test');
});

authhandle.get('/test2', (ctx, next) => {
  ctx.json('test2');
});


/**
 *注册接口
 *@email :邮箱
 *@username:用户名
 *@password:密码
 *
 */
authhandle.post('/register', async (ctx, next) => {
  const {email, username, password} = ctx.request.body;
  if (!email || !username || !password) {
    return ctx.json(40001);
  }

  const userNumber = await UserModel.count({
    email: email
  }).catch(e => {
    console.log(e);
  });
  if (userNumber) {
    return ctx.json('此邮箱已经注册');
  }

  const sha256Pass = crypto.createHmac('sha256', secret).update(password).digest('hex');

  let newUser = new UserModel({
    username: username,
    password: sha256Pass,
    teamsId: [],
    email: email,
    updateTime: Date.now(),
  })

  let saveresult = await newUser.save();
  
  saveresult.password = '';
  ctx.session.user = {};
  ctx.session.user = saveresult;
  ctx.json(saveresult);
});
/**
 *登出接口
 *
 */
authhandle.get('/logout', async (ctx, next) => {
  ctx.session.user = {};
  ctx.json();
});


authhandle.post('/login', async (ctx, next) => {
  const {email, password} = ctx.request.body;
  if (!email || !password) {
    return ctx.json(40001);
  }

  const sha256Pass = crypto.createHmac('sha256', secret).update(password).digest('hex');
  let users = await UserModel.find({
    email: email,
    password: sha256Pass
  }, {password:0}).catch(e => {
    console.log(e);
  });
  if (users.length === 0) {
    return ctx.json('邮箱或密码输入错误');
  }
  if (users.length !== 1) {
    return ctx.json(40002);
  }
  ctx.session.user = users[0];
  ctx.json(users[0]);
});




export default authhandle;


