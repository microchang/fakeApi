import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './team.less';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export class Team extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      teamMember: [
        {
          id: 123,
          name: '彼得大帝'
        }, {
          id: 124,
          name: '小野妹子'
        }, {
          id: 125,
          name: '江小白'
        }, {
          id: 126,
          name: '牧羊人'
        }
      ]
    };
  }

  componentDidMount() {
    const fallBody = document.getElementById('fallBody');
    fallBody.addEventListener('animationend', (e) => {

      if (e.type === 'animationend') {
        this.setState({
          isReady: true
        });
      }
    }, false);
  }

  componentWillMount() {
  }

  render() {
    const {isReady, teamMember} = this.state;
    const bodyClass = isReady ? 'body fall-down body-ready' : ' body fall-down ';
    return (
      <div className='fk-team'>
        <div className='warp'></div>
        <div className={bodyClass} id='fallBody'>
          <div className='row'>
            <label htmlFor="team-title">团队名称：</label>
            <input type="text" name='team-title'/>
          </div>

          <div className='row'>
            <label htmlFor="team-des">团队描述（可选）：</label>
            <input type="text" name='team-des'/>
          </div>

          <div className='row'>
            <label >团队成员：</label>
            <div className='members'>
              {
                teamMember.map((member, key) => {
                  return <span className='member' key={key}>
                    {member.name}
                  </span>;
                })
              }
            </div>

          </div>

          <div className='row'>
            <label htmlFor="team-des">输入成员姓名：</label>
            <input className='add-member' type="text" name='team-des'/>
            <input className='add-member-btn' type="button" value='添加'/>
          </div>

          <div className='control'>
            <input className='save' type="button" value='保存'/>
            <input className='quit' type="button" value='取消'/>
          </div>

        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Team);