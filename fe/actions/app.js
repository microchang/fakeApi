import actionVariable from '../actions/actionVariable.js';
import ajax from "../components/utility/ajax.js";
// import LS from '../components/utility/localStorage.js';

const {
  TEAM_LIST,
  SHOW_TEAM
} = actionVariable;


export function getTeams() {
  return async(dispatch) => {
    ajax({
      url: 'user/teams'
    }).then(result => {
      if (result.code) {
        return result.message;
      }
      dispatch({
        type: TEAM_LIST,
        data: result.data
      })
    });
  };
}

export function showTeam(data) {
  return (dispatch) => {
    dispatch({
      type: SHOW_TEAM,
      data:data
    });
  };
}


