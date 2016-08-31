import mongoose from 'mongoose';
import conf from '../configs/config';
//mongoose自带的promise并不完善，用原生promise代替 http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;
mongoose.connect(conf.mongo.connectStr);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open.');
});

export default mongoose;