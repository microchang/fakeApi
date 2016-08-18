import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './header.less';

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
    this.state = {
    };
  }

  componentDidMount() {
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className='fk-header'>
        
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(XXX);