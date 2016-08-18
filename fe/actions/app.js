import actionVariable from "../actions/actionVariable.js";
import ajax from "../components/utility/ajax.js";
import LS from "../components/utility/localStorage.js";

const {
  COMPANY_INFO,
  SHOW_TIP
} = actionVariable;

export function getCompanyData(corpId) {
  return async dispatch => {
    try {
      ajax({
        url: "corp/get?uuid=" + corpId,
        method: 'get',
      }).then(data => {
        dispatch({
          type: COMPANY_INFO,
          data: data.view
        });
      })

      if (!initData.error) {

      } else {

      }

    } catch (err) {
    }
  }
}

export function showTip(data) {
  return (dispatch) => {
    dispatch({
      type: SHOW_TIP,
      data: data
    });
  }
}

export function UpdateCompanyData(data, cb) {
  return async (dispatch) => {
    try {
      ajax({
        url: "pinshow/corp/save",
        method: 'post',
        data: data
      }).then(data => {
        dispatch({
          type: COMPANY_INFO,
          data: data.view
        });
      })

      if (!initData.error) {

      } else {

      }

    } catch (err) {
    }
  }
}

export function updatePerson() {

}

