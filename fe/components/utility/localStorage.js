/*
*为方便调用，只支持一级结构
*/
class LS {
  _canIUse() {
    if (!window.localStorage) {
      throw new Error('sorry you can not use localStorage here~');
    }
    if (!window.localStorage.CE_JSON) {
      console.log('begin use localStorage...');
      window.localStorage.CE_JSON = '\{\}';
    }
  }
  gv(name) {
    this._canIUse();
    if (!name) {
      console.log('here we return all localStorage.cejson');
      return JSON.parse(window.localStorage.CE_JSON);
    }
    let _this = JSON.parse(window.localStorage.CE_JSON);
    try {
      return JSON.parse(_this[name]);
    } catch (e) {
      return _this[name] || '';
    }

  }
  sv(name, value) {
    if (!name || !value) {
      return console.log('we need a name and value,right?');
    }
    this._canIUse();
    try {
      let _this = JSON.parse(window.localStorage.CE_JSON);
      switch (typeof value) {
        case 'string':
        case 'number':
          _this[name] = value;
          break;
        case 'object':
          _this[name] = JSON.stringify(value);
          break;
        default:
          throw new Error('we need a right value type!');
      }
      window.localStorage.CE_JSON = JSON.stringify(_this);
    } catch (e) {

    }
  }

  dv(name) {
    if (!name) {
      return window.localStorage.CE_JSON = '\{\}';
    }
    let _this = JSON.parse(window.localStorage.CE_JSON);
    if (typeof name == 'string') {

      delete _this[name];
      window.localStorage.CE_JSON = JSON.stringify(_this);
    } else if (typeof name == 'object' && name.length) {
      for (let i = 0; i < name.length; i++) {
        delete _this[name[i]];
      }
      window.localStorage.CE_JSON = JSON.stringify(_this);
    } else {
      throw new Error('delete action need a string or list!');
    }

  }
}

export default new LS();