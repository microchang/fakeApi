import actionVariable from '../actions/actionVariable.js';

const {
  COMPANY_INFO,
  SHOW_TIP
} = actionVariable;

const initAppData = {
  companyInfo: {},
  tip: {
    modalIsOpen: false,
    title: '',
    content: '',
    closeBtn: false,
    closeTime: 3000
  }
};

export function AppData(state = initAppData, action = null) {

  let returnStte = {};

  switch (action.type) {
    case COMPANY_INFO:
      returnStte = Object.assign({}, state, {
        companyInfo: action.data
      });
      break;

    case SHOW_TIP:
      returnStte = Object.assign({}, state, {
        tip: action.data
      });
      break;
    default:
      return state;
  }
  return returnStte;
}