import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router';

import './nav.less';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export class Nav extends Component {


  constructor(props) {
    super(props);
    this.state = {
      moduleList: [
        {
          name: '信息',
          icon: '',
          columns: [
            {
              name: '个人信息',
              href: '/personinfo'
            },
            {
              name: '公司信息',
              href: '/companyinfo'
            }
          ]
        },
        {
          name: '产品',
          icon: '',
          columns: [
            {
              name: '产品类别',
              href: '/producttype'
            },
            {
              name: '产品详情',
              href: '/productdetail'
            }
          ]
        },
        {
          name: '资质介绍',
          icon: '',
          columns: [
            {
              name: '企业资质',
              href: '/companyIntroduce'
            },
            {
              name: '成功项目',
              href: '/companyProject'
            },
            {
              name: '公司服务',
              href: '/CompanyServer'
            }
          ]
        },
      ]
    };
  }



  componentWillMount() {

  }

  componentDidMount() {
  }

  render() {
    const {moduleList} = this.state;
    return (
      <div className='ce-nav'>
        {moduleList.map((item, key) => {

          return <div className="module" key={key}>
            <div className="name">{item.name}</div>
            <div className="columns">
              {
                item.columns.map((column, key) => {
                  return (
                    <Link to={column.href}>
                      <div className="col" key={key}>

                        {column.name}
                      </div>
                    </Link>
                  );

                })
              }
            </div>
          </div>;
        }) }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);