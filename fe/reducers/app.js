import actionVariable from '../actions/actionVariable.js';

const {
TEAM_LIST,
  SHOW_TEAM
} = actionVariable;

const initAppData = {
  teamInfo: {
    id: '',
    isShow: false
  },
  teamList: []
};

export function AppData(state = initAppData, action = null) {

  let returnStte = {};

  switch (action.type) {

     case TEAM_LIST:
      returnStte = Object.assign({}, state, {
        teamList: action.data
      });
      break;
    
    case SHOW_TEAM:
      returnStte = Object.assign({}, state, {
        teamInfo: action.data
      });
      break;
    default:
      return state;
  }
  return returnStte;
}