/*
*为方便调用，只支持一级结构
*/
class LS {
  _canIUse() {
    if (!window.localStorage) {
      throw new Error('sorry you can not use localStorage here~');
    }
    if (!window.localStorage.FK_JSON) {
      window.localStorage.FK_JSON = '\{\}';
    }
  }
  gv(name) {
    this._canIUse();
    if (!name) {
      return JSON.parse(window.localStorage.FK_JSON);
    }
    let _this = JSON.parse(window.localStorage.FK_JSON);
    try {
      return JSON.parse(_this[name]);
    } catch (e) {
      return _this[name] || '';
    }

  }
  sv(name, value) {
    if (!name || !value) {
      throw new Error('we need a name and value,right?');
    }
    this._canIUse();
    try {
      let _this = JSON.parse(window.localStorage.FK_JSON);
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
      window.localStorage.FK_JSON = JSON.stringify(_this);
    } catch (e) {
      throw new Error('we need a right value type!');
    }
  }

  dv(name) {
    if (!name) {
      return window.localStorage.FK_JSON = '\{\}';
    }
    let _this = JSON.parse(window.localStorage.FK_JSON);
    if (typeof name == 'string') {

      delete _this[name];
      window.localStorage.FK_JSON = JSON.stringify(_this);
    } else if (typeof name == 'object' && name.length) {
      for (let i = 0; i < name.length; i++) {
        delete _this[name[i]];
      }
      window.localStorage.FK_JSON = JSON.stringify(_this);
    } else {
      throw new Error('delete action need a string or list!');
    }

  }
}

export default new LS();