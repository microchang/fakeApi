import mongoose from './connect';
const Schema = mongoose.Schema;

const Api = new Schema({
  id: { type: Schema.Types.ObjectId, index: true },
  title: { type: String, default: '' },
  des:{ type: String, default: '' },
  method: { type: Number, default: 1 },
  isHttps: { type: Boolean, default: false },
  path: { type: String, default: '' },
  content: { type: String, default: '{}' },  
  teamCode: { type: String, default: '' },
  teamId:Schema.Types.ObjectId,
  updateId: Schema.Types.ObjectId,
  updateTime: { type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now },
  state: { type: Number, default: 0 }
});


Api.pre('save', function(next){
  this.updateTime = Date.now();
  next();
});

Api.pre('update', function(next){
  this.updateTime = Date.now();
  next();
});

const ApiModel = mongoose.model('ApiModel', Api);

export default ApiModel;