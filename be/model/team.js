import mongoose from './connect';
const Schema = mongoose.Schema;

const Team = new Schema({
  id: { type: Schema.Types.ObjectId, index: true },
  title: String,
  code:String,
  des:{type:String,default:''},
  memberIds: [],
  updateTime:{ type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now },
  state:{ type: Number, default: 0}//0正常，1删除
});

Team.pre('save', function(next){
  this.updateTime = Date.now();
  next();
});

Team.pre('update', function(next) {
  this.updateTime = Date.now();
  next();
});

const TeamModel = mongoose.model('TeamModel', Team);

export default TeamModel;