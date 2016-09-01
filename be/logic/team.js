import Router from 'koa-router';
import TeamModel from '../model/team';
import UserModel from '../model/user';
import shortid from 'shortid';
const teamRouterhandle = new Router();

teamRouterhandle.get('/test', (ctx, next) => {
  ctx.body = 'hello teeeeeeeeeeeeeeeeam';
});

//get
teamRouterhandle.get('/all', async (ctx, next) => {
  // const allUsers = await TeamModel.find();
  ctx.json(['1', '2', '3']);
});

/**
 *通过团队id获取该团队信息
 *
 */
teamRouterhandle.get('/:id', async (ctx, next) => {
  const team = await TeamModel.findById(ctx.params.id).catch(e => {
  });
  ctx.json(team);
});


/**
 *新建团队
 *
 *
 */
teamRouterhandle.post('/', async (ctx, next) => {
  let {title, des, memberIds} = ctx.request.body;
  memberIds = memberIds.split(',');
  const newTeam = new TeamModel({
    title: title,
    des: des,
    memberIds: memberIds,
    code: shortid.generate()
  });
  await newTeam.save();
  let updateUser = [];
  for (let i = 0; i < memberIds.length; i++) {
    updateUser.push(new Promise(resolve => {
      UserModel.findById(memberIds[i]).then(user => {
        user.teamsId.push(newTeam._id);
        user.save().then(() => {
          resolve(0);
        });
      });
    }));
  }
  await Promise.all(updateUser);
  let user = ctx.session.user;
  user.teamsId.push(newTeam._id);
  ctx.session.user = user;
  ctx.json(newTeam);
});


/**
 *给团队添加成员
 *团队的userIds会改变
 *user的teamsId也会改变
 *
 */
teamRouterhandle.put('/:teamId/user/:addUserId', async (ctx, next) => {
  const {user} = ctx.session;
  const {teamId, addUserId} = ctx.params;
  const team = await TeamModel.findById(teamId);
  if (!team) {
    return ctx.json(40004);
  }
  if (team.memberIds[0] !== user._id) {
    return ctx.json(40003);
  }
  if (team.memberIds.join(',').indexOf(addUserId) > -1) {
    return ctx.json('该用户已经在此团队中');
  }

  const addUser = await UserModel.findById(addUserId);
  team.updateTime = Date.now();
  team.memberIds.push(addUserId);
  addUser.teamsId.push(teamId);
  //todo:事……事务？
  const teamSaveResult = await team.save();
  const userSaveResult = await addUser.save();
  ctx.json();
});




/**
 *通过email给团队添加成员
 *
 */
teamRouterhandle.put('/:teamId/email/:email', async (ctx, next) => {
  const {user} = ctx.session;
  const {teamId, email} = ctx.params;
  const team = await TeamModel.findById(teamId);
  const addUser = await UserModel.finOne({
    email: email
  });
  if (!team || !addUser) {
    return ctx.json(40004);
  }
  if (team.memberIds[0] !== user._id) {
    return ctx.json(40003);
  }
  const addUserId = addUser._id;
  if (team.memberIds.join(',').indexOf(addUserId) > -1) {
    return ctx.json('该用户已经在此团队中');
  }

  team.updateTime = Date.now();
  team.memberIds.push(addUserId);
  addUser.teamsId.push(teamId);

  const teamSaveResult = await team.save();
  const userSaveResult = await addUser.save();
  ctx.json(team);
});

/**
 *修改团队信息
 *貌似……和修改成员的功能重复了？
 *
 */
teamRouterhandle.put('/:teamId', async (ctx, next) => {
  const {title, des, memberIds} = ctx.request.body;
  const {teamId} = ctx.params;
  const {user} = ctx.session;
  const team = await TeamModel.findById(teamId);
  if (!team) {
    return ctx.json(40004);
  }
  if (team.memberIds[0] !== user._id) {
    return ctx.json(40003);
  }
  team.title = title;
  team.des = des;
  team.memberIds = memberIds ? memberIds.split(',') : [];

  await team.save();
  ctx.json();
});


/**
 *解散团队
 *假删除，暂定15天以后真删除
 *
 */
teamRouterhandle.delete('/:teamId', async (ctx, next) => {
  const {teamId} = ctx.params;
  const {user} = ctx.session;
  const team = await TeamModel.findById(teamId);
  if (!team) {
    return ctx.json(40002);
  }
  if (user._id !== team.memberIds[0]) {
    return ctx.json(40003);
  }
  team.state = 1;
  await team.save();
  ctx.json();
});


/**
 *删除团队中的某个成员
 *
 */
teamRouterhandle.delete('/:teamId/user/:userId', async (ctx, next) => {
  const {teamId, userId} = ctx.params;
  const {user} = ctx.session;
  const team = await TeamModel.findById(teamId);
  if (team.memberIds[0] !== userId) {
    return ctx.json(40003);
  }
  if (team.memberIds.length === 1) {
    return ctx.json('团队里面已是最后一人了，无法删除。');
  }
  let memberList = team.memberIds;
  let memberListString = memberList.toString().replace(userId, '');
  memberListString = memberListString.replace(',,', ',');
  team.memberIds = memberListString.split(',');
  const saveResult = await team.save();
  ctx.json();
})

export default teamRouterhandle;