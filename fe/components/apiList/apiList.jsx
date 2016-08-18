import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './apiList.less';

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
    this.state = {
      apiList: [
        {
          id: 1222,
          title: '获取列表',
          method: 'get',
          url: 'get/all',
          updateTime: new Date(),
          updateMan: {
            id: 213123,
            name: 'chang'
          }
        }, {
          id: 1222,
          title: '获取单个商品信息',
          method: 'get',
          url: 'get/124456554',
          updateTime: new Date(),
          updateMan: {
            id: 213123,
            name: 'chang'
          }
        }, {
          id: 1222,
          title: '修改单个商品信息',
          method: 'update',
          url: '/goods/12312',
          updateTime: new Date(),
          updateMan: {
            id: 213123,
            name: 'chang'
          }
        }, {
          id: 1222,
          title: '新增商品',
          method: 'post',
          url: '/goods/new',
          updateTime: new Date(),
          updateMan: {
            id: 213123,
            name: 'chang'
          }
        }, {
          id: 1222,
          title: '删除商品',
          method: 'delete',
          url: '/goods/123131231',
          updateTime: new Date(),
          updateMan: {
            id: 213123,
            name: 'chang'
          }
        },
      ],
      team: {
        name: '噗嗤噗嗤一期',
        id: 1231232131,
        member: [
          {
            id:1,name:'chang'
          },
          {
            id:2,name:'long'
          },
          {
            id:3,name:'gongga'
          },
          {
            id:4,name:'我是中文名字哟哟哟'
          }
        ]
      }
    };
  }

  componentDidMount() {

  }

  componentWillMount() {

  }

  render() {
    const {apiList, team} = this.state;
    return (
      <div className='fk-api-list'>

        <div className='brief'>
          <p className='name'>所属团队: {team.name}</p>  
         <p className='add'>添加新的api</p>  
        </div>

        {
          apiList.map((api, key) => {
            return <div className='api' key={key}>
              <span className='sit'>{api.method}</span>
              <span className='sit'>{api.title}</span>
              <span className='sit'>{api.url}</span>
              <span className='sit'>{api.updateMan.name}</span>
              <span className='sit'>{api.updateTime.toLocaleString()}</span>
              <span className='sit'>修改 | 删除</span>
            </div>;
          })
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApiList);


