import Router from 'koa-router';
import TeamModel from '../model/team';

const teamRouterhandle = new Router();

teamRouterhandle.get('/test', (ctx, next) => {
  ctx.body = 'hello teeeeeeeeeeeeeeeeam';
});

//get
teamRouterhandle.get('/all', async (ctx, next) => {
  // const allUsers = await TeamModel.find();
  ctx.json(['1','2','3']);
});

//get
teamRouterhandle.get('/:id', async (ctx, next) => {
  const user = await TeamModel.find({ id: ctx.params.id }).catch(e => {
  });
  ctx.body = user;
});

//create
teamRouterhandle.post('/add', async (ctx, next) => {
 
});

//update
teamRouterhandle.post('/:id', async (ctx, next) => {

});

export default teamRouterhandle;