
import {Store} from "koa-session2";
import sessionModel from '../model/session';
export default class MongoStore extends Store {
  constructor() {
    super();
  }

  async get(sid) {
    let session = await sessionModel.findById(sid);
    if (!session) {
      return {};
    }
    let svalue = session.svalue;
    return JSON.parse(svalue);
  }

  async set(session, opts) {
    if (!opts.sid) {
      opts.sid = this.getID(24);
    }
    opts.svalue = JSON.stringify(session);
    let newSession = new sessionModel(opts);
    await newSession.save();
    return newSession.sid;
  }

  async destroy(sid) {
    return await sessionModel.remove({
      sid: sid
    });
  }
}