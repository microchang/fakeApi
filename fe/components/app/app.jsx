import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import {Link} from 'react-router';

import './app.less';
import Header from '../header/header.jsx';
import Team from '../team/team.jsx';
function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export class App extends Component {

  componentWillMount() {

  }
  componentDidMount() {

    window.onresize = () => {
      resize();
    };
    window.onerror = function (message, source, lineno, colno, error) {
      // alert(message);
    };
    function resize() {
      const windowWidth = window.innerWidth;
      if (windowWidth < 640) {
        document.getElementsByTagName('html')[0].style.fontSize = '16.5px';
      } else {
        document.getElementsByTagName('html')[0].style.fontSize = windowWidth / 16.5 + 'px';
      }
    }
    resize();
  }


  render() {
    const {teamInfo} = this.props.AppData;
    return (
      <div className="ck-app">
        <Header />
        {
          teamInfo.isShow ?
            <Team  teamInfo={teamInfo} /> : null
        }
        {
          this.props.children
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);