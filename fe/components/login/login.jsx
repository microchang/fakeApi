import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './login.less';
import ajax from '../utility/ajax.js';
import LS from '../utility/localStorage.js';
function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export class Login extends Component {

  constructor(props) {
    super(props);
    this.changeType = this.changeType.bind(this);
    this.sure = this.sure.bind(this);
    this.testEmail = this.testEmail.bind(this);
    this.testUsername = this.testUsername.bind(this);
    this.testPassword = this.testPassword.bind(this);

    this.state = {
      isLogin: true,
      info: {},
      usernameRight: false,
      passwordRight: false,
      emailRight: false,
    };
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

  changeType(e) {
    const type = e.target.dataset.type === 'true';
    this.setState({
      isLogin: type,
    });
  }

  sure() {
    const {isLogin, emailRight, passwordRight, usernameRight} = this.state;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (isLogin) {
      if (!(emailRight && passwordRight)) {
        return;
      }
      ajax({
        url: 'auth/login',
        method: 'post',
        data: {
          email: email,
          password: password
        }
      }).then(result => {

        if (result.code) {
          return this.setState({
            info: {
              email: result.message
            }
          });
        }


        LS.sv('user', result.data);
        location.href = '/';
      });

    } else {
      if (!(emailRight && passwordRight && usernameRight)) {
        return;
      }
      const username = document.getElementById('username').value;
      ajax({
        url: 'auth/register',
        method: 'post',
        data: {
          email: email,
          password: password,
          username: username
        }
      }).then(result => {
        if (result.code) {
          return this.setState({
            info: {
              email: result.message
            }
          });
        }
        LS.sv('user', result.data);
        location.href = '/';
      });
    }
  }

  testEmail() {
    const email = document.getElementById('email').value;
    let {info} = this.state;
    if (/[a-z0-9-]{1,60}@[a-z0-9-]{1,65}.[a-z]{2,3}/.test(email)) {
      delete info.email;
      return this.setState({
        emailRight: true,
        info: info
      });
    }
    info.email = '请输入正确的邮箱格式';
    this.setState({
      emailRight: false,
      info: info
    });
  }

  testUsername() {
    const username = document.getElementById('username').value;
   
    let {info} = this.state;
    if (username.length < 2) {
      info.username = '用户名长度要大于2哟';
      return this.setState({
        usernameRight: false,
        info: info
      });
    } else {
      delete info.username;
      return this.setState({
        usernameRight: true,
        info: info
      });
    }
  }

  testPassword() {
    let {info} = this.state;
    const password = document.getElementById('password').value;
    if (password.length < 6) {
      info.password = '密码长度大于6～';
      return this.setState({
        passwordRight: false,
        info: info
      });
    } else {
      delete info.password;
      return this.setState({
        passwordRight: true,
        info: info
      });
    }
  }

  componentWillMount() {
  }


  render() {
    const {isLogin, info} = this.state;
    return (
      <div className='fk-login'>
        <div className='box'>
          <p>
            <span className={isLogin ? 'border-bottom' : ''} onClick={this.changeType} data-type='true'> 登录 </span>
            <span className={isLogin ? '' : 'border-bottom'} onClick={this.changeType} data-type='false'> 注册 </span>
          </p>
          <input className='' type="email" placeholder='邮箱' onBlur={this.testEmail} id='email'/>
          {
            isLogin ?
              null
              :
              <input type="text" placeholder='昵称' minLength='2' onBlur={this.testUsername} id='username'/>
          }
          <input type="password" placeholder='密码' minLength='6' onBlur={this.testPassword} id='password'/>
          <div className='info'>
            <span>{info.email}</span>
            {
              isLogin ?
                null :
                <span>{info.username}</span>
            }
            <span>{info.password}</span>
          </div>
          <div className='control'>
            <span onClick={this.sure}>确定</span>
          </div>
        </div>

      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);