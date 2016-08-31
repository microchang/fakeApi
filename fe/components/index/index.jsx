import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router';
import LS from '../utility/localStorage.js';

import {showTeam,getTeams} from '../../actions/app.js';
import './index.less';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    showTeam,
    getTeams
  }, dispatch);
}

export class Index extends Component {

  constructor(props) {
    super(props);
    this.showTeamAction = this.showTeamAction.bind(this);
    this.state = {
      teamList: [
       
      ]
    };
  }
  showTeamAction(e) {
    this.props.showTeam({
      id: e.target.dataset.id,
      isShow: true
    });
  }

  componentWillMount() {
    const user = LS.gv('user');
    if (!user) {
      return location.href = '/login';
    }
    this.props.getTeams();
  }

  componentDidMount() {


  }



  render() {
    const {teamList} = this.props.AppData;
    return (
      <div className="fk-index">

        <div className='title'>
          <p>我参与的团队：</p>
        </div>
        <div className='api-list'>
          {
            teamList.map((team, key) => {
              const teamUrl = '' + '/team/' + team._id;
              return <div className='team' key={key} >
                <Link to={teamUrl}>
                  <p>{team.title}</p>
                </Link>

                <div className='control' data-id={team._id} onClick={this.showTeamAction}>
                  设置
                </div>
              </div>;

            })
          }
          <div className='team add' data-id='new' onClick={this.showTeamAction}>添加团队</div>
        </div>




      </div>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);