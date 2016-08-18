import mongoose from './connect';
const Schema = mongoose.Schema;

const User = new Schema({
  id: {type:Schema.Types.ObjectId,index:true},
  username: { type: String, default: 'guest' },
  password: { type: String, default: '123456' },
  oauthType:{ type: String, default: '' },
  openID:{ type: String, default: '' },
  teamsId: [],
  updateTime:{ type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now },
  state:{ type: Number, default: 0}
});

const UserModel = mongoose.model('UserModel', User);

export default UserModel;