import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './api.less';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export class Api extends Component {
  constructor(props) {
    super(props);
    this.submitData = this.submitData.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.inputChange = this.inputChange.bind(this);
    
    this.state = {
      api: {
        name: '',
        path: '',
        method: '',
        des: '',
        content:''
      }
    };
  }

  inputChange(e) {
    
  }

  componentDidMount() {
  }

  componentWillMount() {
  }

  submitData(e) {
    e.preventDefault();
   
  }
  
  selectChange(){

  }

  render() {
    const selectOptions = [
         { value: '0', label: 'GET' },
         { value: '1', label: 'POST' },
         { value: '3', label: 'PUT' },
         { value: '4', label: 'DELETE' },
         { value: '5', label: 'HEAD' },
         { value: '6', label: 'CONNECT' },
         { value: '7', label: 'OPTIONS' },
         { value: '8', label: 'TRACE' },
         { value: '9', label: 'PATCH' }
    ];
    return (
      <div className='fk-api'>
          <div className='row'>
          <label htmlFor="api-name">接口名称：</label>
          <input type="text" name='api-name' />
          </div>

          <div className='row'>
          <label htmlFor="api-path">接口路径：</label>
          <input type="text" name='api-path' onChange = {this.inputChange} />
          </div>

          <div className='row'>
          <label htmlFor="api-method">请求类型：</label>
          <Select name="api-method"  className="ck-select" value="0"  options={selectOptions} />
          </div>

          <div className='row'>
          <label htmlFor="api-des">接口描述：</label>
          <input type="text" name='api-des' />
          </div>

          <div className='row'>
          <label htmlFor="api-content">接口内容：</label>
          <input type="text" name='api-content' />
          </div>
          <input type ="submit" value ="提交api" />
        
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Api);