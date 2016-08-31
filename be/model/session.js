import mongoose from './connect';
const Schema = mongoose.Schema;

const Session = new Schema({
  sid: { type: String, index: true },
  svalue: { type: String, default: '{}' },
  maxAge: String,
  updateTime: { type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now },
});
Session.pre('save', function(next){
  this.updateTime = Date.now();
  next();
});

Session.pre('update', function(next){
  this.updateTime = Date.now();
  next();
});
const SessionModel = mongoose.model('SessionModel', Session);

export default SessionModel;