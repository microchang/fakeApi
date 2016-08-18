import mongoose from './connect';
const Schema = mongoose.Schema;

const Team = new Schema({
  id: { type: Schema.Types.ObjectId, index: true },
  title: String,
  des:{type:String,default:''},
  memberIds: [],
  updateTime:{ type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now },
  state:{ type: Number, default: 0}
});

const TeamModel = mongoose.model('TeamModel', Team);

export default TeamModel;