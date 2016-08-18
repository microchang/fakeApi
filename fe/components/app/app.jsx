import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import {Link} from 'react-router';

import './app.less';
import LS from '../utility/localStorage.js';
import Header from '../header/header';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export class App extends Component {

  componentWillMount() {
    // const user = LS.gv('pinxiuUser');
    // if (!user && location.pathname != '/login') {
    //   return location.href = '/login';
    // }



  }
  componentDidMount() {
    // if (location.pathname != '/login') {
    //   const user = LS.gv('pinxiuUser');
    //   this.props.getCompanyData(user.corpIdList[0]);
    // }

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
    return (
      <div className="ck-app">
        <Header />
        {
          this.props.children
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);