import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router';
import Clipboard from 'clipboard';
import './apiList.less';
import ajax from '../utility/ajax.js';
function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export class ApiList extends Component {

  constructor(props) {
    super(props);
    this.delApi = this.delApi.bind(this);
    this.state = {
      clipboard: null,
      apiList: [
      ],
      team: {
      },
      member: []
    };
  }

  componentDidMount() {
    if (!this.state.clipboard) {
      const clipboard = new Clipboard('.copy');
      clipboard.on('success', (e) => {
        e.clearSelection();
      });
      this.setState({
        clipboard: clipboard
      });
    }

  }

  componentWillUnmount() {
    this.state.clipboard.destroy();
  }


  componentWillMount() {
    const teamId = this.props.params.teamId;
    const {teamList} = this.props.AppData;
    let currentTeam;
    for (let i = 0; i < teamList.length; i++) {
      if (teamList[i]._id === teamId) {
        currentTeam = teamList[i];
      }
    }
    const getApiList = new Promise(resolve => {
      ajax({
        url: 'api/team/' + teamId,
      }).then(result => {
        resolve(result.data);
      });
    });
    const getMembers = new Promise(resolve => {
      ajax({
        url: 'user/users',
        method: 'post',
        data: {
          userIds: currentTeam.memberIds.join(',')
        }
      }).then(result => {
        resolve(result.data);
      });
    });
    Promise.all([getApiList, getMembers]).then(result => {
      console.log(result);
      this.setState({
        apiList: result[0],
        member: result[1],
        team: currentTeam
      });
    });
  }

  delApi(e) {
    const id = e.target.dataset.id;
    ajax({
      url: 'api/' + id,
      method: 'delete',
    }).then(result => {
      if (result.code) {
        return alert(result.message);
      }
      let apiList = this.state.apiList;
      let newList = [];
      for (let i = 0; i < apiList.length; i++) {
        if (apiList[i]._id === id) {
          continue;
        }
        newList.push(apiList[i]);
      }
      this.setState({
        apiList: newList
      });
    });
  }

  render() {
    let {apiList, team, member} = this.state;
    apiList = apiList.sort();
    const httpList = ['ALL', 'GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH'];
    return (
      <div className='fk-api-list'>
        
        <div className='brief'>
          <p className='name'> {team.title}</p>
          <p className='des'>
          {team.des}
          </p>
          <p className='member'>团队成员：{
            member.map((member, key) => {
              return <span className='name' key={key}>
                <Link to={member._id}> {member.username} </Link>
              </span>;
            })
          }</p>
        </div>

        <div className='control'>
          <Link to={'/team/' + team._id + '/api/new'}>
            <p className='add'>添加新的api</p>
          </Link>
        </div>

        <div className='list'>
          <div className='api title'>
            <span className='sit'>http方式</span>
            <span className='sit'>接口名称</span>
            <span className='sit url'>接口URL</span>
            <span className='sit'>修改时间</span>
            <span className='sit'>操作</span>
          </div>

          {
            apiList.map((api, key) => {
              let url = api.isHttps ? 'https://' : 'http://';
              url = url + 'api.llchangll.com/api/r/' + team.code +'/'+ api.path;
              return <div className='api' key={key}>
                <span className='sit'>{httpList[api.method]}</span>
                <span className='sit'>{api.title}</span>
                <span className='sit url' ><button className='copy' data-clipboard-action="copy" data-clipboard-text={url}>贴</button>{url}</span>
                <span className='sit'>{api.updateTime.toLocaleString() }</span>
                <span className='sit'><Link to={'/team/' + team._id + '/api/' + api._id} ><span className='update'>修改</span></Link>  | <span onClick={this.delApi} className='del' data-id={api._id}>删除</span></span>
              </div>;
            })
          }
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApiList);


