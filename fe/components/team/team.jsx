import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './team.less';
import ajax from '../utility/ajax.js';
import {showTeam} from '../../actions/app.js';
import LS from '../utility/localStorage.js';
function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    showTeam
  }, dispatch);
}

export class Team extends Component {

  constructor(props) {
    super(props);
    this.quit = this.quit.bind(this);
    this.saveTeam = this.saveTeam.bind(this);
    this.inputChange = this.inputChange.bind(this);

    this.state = {
      isNew: true,
      isReady: false,
      _id: '',
      teamMember: [],
      title: '',
      des: '',
    };
  }

  quit() {
    this.props.showTeam({
      isShow: false
    });
  }

  componentDidMount() {
    const {teamInfo} = this.props;
    const {teamList} = this.props.AppData;
    let currentTeam;
    for (let i = 0; i < teamList.length; i++) {
      if (teamList[i]._id === teamInfo.id) {
        currentTeam = teamList[i];
        break;
      }
    }
    if (currentTeam) {
      ajax({
        url: 'user/users',
        method: 'post',
        data: {
          userIds: currentTeam.memberIds.join(',')
        }
      }).then(result => {
        if (result.code) {
          alert(result.message);
          return this.props.showTeam({
            isShow: false
          });
        }
        this.setState({
          _id:teamInfo.id,
          isNew: false,
          title: currentTeam.title,
          des: currentTeam.des,
          teamMember: result.data
        });
      });
    } else {
      this.setState({
        teamMember: [LS.gv('user')]
      });
    }

    const fallBody = document.getElementById('fallBody');
    fallBody.addEventListener('animationend', (e) => {
      if (e.type === 'animationend') {
        this.setState({
          isReady: true
        });
      }
    }, false);
  }

  inputChange(e) {
    const type = e.target.dataset.type;
    const value = e.target.value;
    let oldState = this.state;
    oldState[type] = value;
    this.setState(oldState);
  }

  saveTeam() {
    const {title, des, teamMember, isNew,_id} = this.state;
    let memberIds = [];
    for (let i = 0; i < teamMember.length; i++) {
      memberIds.push(teamMember[i]._id);
    }
    memberIds = memberIds.join(',');
    if (!title || !memberIds) {
      return;
    }
    if (isNew) {
      ajax({
        url: 'team',
        method: 'post',
        data: {
          title: title,
          des: des,
          memberIds: memberIds
        }
      }).then(result => {
        if (result.code) {
          return alert(result.message);
        }
        let user = LS.gv('user');
        user.teamsId.push(result.data._id);
        LS.sv('user', user);
        location.href = '/';
      });
    } else {
      ajax({
        url: 'team/'+_id,
        method: 'put',
        data: {
          title: title,
          des: des,
          memberIds: memberIds
        }
      }).then(result => {
        if (result.code) {
          return alert(result.message);
        }
        location.href = '/';
      });
    }

  }

  componentWillMount() {
  }

  render() {
    const {isReady, title, des, teamMember} = this.state;
    const bodyClass = isReady ? 'body fall-down body-ready' : ' body fall-down ';
    return (
      <div className='fk-team'>
        <div className='warp'></div>
        <div className={bodyClass} id='fallBody'>
          <div className='row'>
            <label htmlFor="team-title">团队名称：</label>
            <input type="text" value={title} data-type='title' onChange={this.inputChange} name='team-title'/>
          </div>

          <div className='row'>
            <label htmlFor="team-des">团队描述（可选）：</label>
            <input type="text" value={des} data-type='des' onChange={this.inputChange} name='team-des'/>
          </div>

          <div className='row'>
            <label >团队成员：</label>
            <div className='members'>
              {
                teamMember.map((member, key) => {
                  return <span className='member' key={key}>
                    {member.username}
                  </span>;
                })
              }
            </div>

          </div>

          <div className='row'>
            <label htmlFor="team-des">添加成员：</label>
            <input className='add-member' placeholder='输入成员邮箱' type="text" name='team-des'/>
            <input className='add-member-btn' type="button" onClick={this.addUser} value='添加'/>
          </div>

          <div className='control'>
            <input className='save' type="button" onClick={this.saveTeam} value='保存'/>
            <input className='quit' onClick={this.quit} type="button" value='取消'/>
          </div>

        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Team);