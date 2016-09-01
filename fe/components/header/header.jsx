import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link } from 'react-router';
import { bindActionCreators } from 'redux';
import './header.less';
import LS from '../utility/localStorage.js';
import ajax from '../utility/ajax.js';
import logo from './logo.png';
function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export class Header extends Component {

  constructor(props) {
    super(props);
    this.tiggleMenu = this.tiggleMenu.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      name: '',
      showMenu:false
    };
  }

  componentDidMount() {

  }

  componentWillMount() {
    const user = LS.gv('user');
    if (!user) {
      return location.href = '/login';
    }
    this.setState({
      name: user.username
    });
  }
  tiggleMenu() {
    this.setState({
      showMenu: !this.state.showMenu
    });
  }
  logout() {
    LS.dv('user');
    ajax({
      url:'auth/logout'
    }).then(result => {
      location.href = '/login';
    });
  }

  render() {
    const menuClass = this.state.showMenu ? 'logout' : 'hide logout';
    return (
      <div className='fk-header'>
        <Link to='/'>
        <img src={logo} alt=""/>
        
        </Link>
        <span className='title'>  </span>
        <span className='name' onClick={this.tiggleMenu}>{this.state.name}</span>
        <span className={menuClass} onClick={this.logout}>登出</span>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);