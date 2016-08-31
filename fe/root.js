import React, {
  Component,
  PropTypes
} from "react";
import configureSrore from "./store/store";
import {
  Provider
} from "react-redux";
import {
  Router,
  Route,
  IndexRoute
} from "react-router";

import RootReducer from './reducers/index.js';
import {browserHistory} from 'react-router'

import App from "./components/app/app.jsx";
import Index from "./components/index/index.jsx";
import ApiList from "./components/apiList/apiList.jsx";
import Api from "./components/api/api.jsx";
import Team from "./components/team/team.jsx";
import Login from "./components/login/login.jsx";

// import OpinionsCollect from "./components/manage/opinionsCollect/index.jsx";

const store = configureSrore(RootReducer);

export default class Root extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/"  component={App}>
            <IndexRoute component={Index} history={browserHistory}/>
            <Route path='index' component={Index} history={browserHistory} />
            <Route path='team/:teamId' component={ApiList} history={browserHistory} />
            <Route path='team/:teamId/api/:id' component={Api} history={browserHistory} />
          </Route>
          <Route path='login' component={Login} />
        </Router >
      </Provider >
    )
  }

}
