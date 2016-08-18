import mongoose from 'mongoose';

//mongoose自带的promise并不完善，用原生promise代替 http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/fakeapi');

mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open.');
});

export default mongoose;