import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import {Link} from 'react-router';
// import ajax from '../utility/ajax';
// import Nav from './nav.jsx';
// import LS from '../utility/localStorage.js';
// import {getCompanyData} from '../../actions/app.js';

import './index.less';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export class Index extends Component {

  constructor(props) {
    super(props);

    this.state = {
      teamList: [
        {
          id: 123,
          name: '比起比起一期',
        },
        {
          id: 124,
          name: '比起比起二期',
        },
        {
          id: 125,
          name: '比起比起三期',
        },
        {
          id: 125,
          name: '比起比起三期',
        },
        {
          id: 125,
          name: '比起比起三期',
        },
        {
          id: 125,
          name: '比起比起三期',
        }, {
          id: 125,
          name: '比起比起三期',
        }, {
          id: 125,
          name: '比起比起三期',
        }, {
          id: 125,
          name: '比起比起三期',
        },{
          id: 125,
          name: '比起比起三期',
        },{
          id: 125,
          name: '比起比起三期',
        },{
          id: 125,
          name: '比起比起三期',
        }
      ]
    };
  }

  componentWillMount() {
  }

  componentDidMount() {


  }



  render() {
    const {teamList} = this.state;
    return (
      <div className="fk-index">


        {
          teamList.map((team, key) => {
            return <div className='team' >
              <p>{team.name}</p>
            </div>;
          })
        }
      </div>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);