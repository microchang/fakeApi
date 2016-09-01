import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import {Link, router} from 'react-router';
import ajax from '../utility/ajax.js';
import 'react-select/dist/react-select.css';
import './api.less';
import './jsoneditor.min.css';
import JSONEditor from  './jsoneditor-minimalist.min.js';

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
    this.changeHttps = this.changeHttps.bind(this);
    this.changeEditor = this.changeEditor.bind(this);
    this.textareaChange = this.textareaChange.bind(this);
    this.randPath = this.randPath.bind(this);
    this.state = {
      teamId: '',
      _id: '',
      title: '',
      path: '',
      isHttps: false,
      method: '0',
      des: '',
      editor: null,
      content: {},
      isEditorContent: false,
    };
  }

  inputChange(e) {
    let oldState = this.state;
    oldState[e.target.dataset.type] = e.target.value;
    this.setState(oldState);
  }

  componentDidMount() {
    const element = document.getElementById('jsonEditor');
    const editor = new JSONEditor(element, {
    });
    const id = this.props.params.id;
    const teamId = this.props.params.teamId;
    if (id !== 'new') {
      ajax({
        url: 'api/' + id,
      }).then(result => {
        if (result.code) {
          return alert(result.message);
        }
        this.setState({
          editor: editor,
          title: result.data.title,
          _id: result.data._id,
          des: result.data.des,
          isHttps: result.data.isHttps,
          path: result.data.path,
          method: result.data.method+'',
          content: JSON.parse(result.data.content),
          updateId: result.data.updateId,
          createTime: result.data.createTime,
          updateTime: result.data.updateTime,
        }, () => {
          editor.set(this.state.content);
        });
      });
    }
    this.setState({
      editor: editor,
      teamId: teamId
    });

  }

  componentWillMount() {

  }

  submitData() {
    let {isEditorContent, teamId, _id, title, des, isHttps, path, method, content} = this.state;
    if (isEditorContent) {
      content = this.state.editor.get();
    }

    if (!title || !path) {
      return;
    }

    if (_id) {
      ajax({
        url: 'api/' + _id,
        method: 'put',
        data: {
          title: title,
          des: des,
          isHttps: isHttps,
          path: path,
          method: method,
          content: content
        }
      }).then(result => {
        this.context.router.goBack();
      });
    } else {
      const {teamList} = this.props.AppData;
      let teamCode = '';
      for (let i = 0; i < teamList.length; i++){
        if (teamList[i]._id === teamId) {
          teamCode = teamList[i].code;
          break;
        }
      }
      ajax({
        url: 'api/team/' + teamId,
        method: 'post',
        data: {
          title: title,
          des: des,
          isHttps: isHttps,
          path: path,
          teamCode:teamCode,
          method: method,
          content: content
        }
      }).then(result => {
        this.context.router.goBack();
      });
    }
  }

  randPath() {
    let randPathString = 'x' + Math.random().toString(36).substr(4);
    this.setState({
      path: randPathString
    });
  }

  changeEditor() {
    this.setState({
      isEditorContent: !this.state.isEditorContent
    }, () => {
      if (!this.state.isEditorContent) {
        this.setState({
          content: this.state.editor.get()
        });
      }
    });

  }

  textareaChange(e) {
    try {
      this.setState({
        content: JSON.parse(e.target.value)
      }, () => {
        this.state.editor.set(this.state.content);
      });
    } catch (e) {

    }
  }

  selectChange(e) {
    this.setState({
      method: '' + e.value
    });
  }

  changeHttps() {
    this.setState({
      isHttps: !this.state.isHttps
    });
  }

  render() {

    const selectOptions = [
      { value: '0', label: 'ALL' },
      { value: '1', label: 'GET' },
      { value: '2', label: 'POST' },
      { value: '3', label: 'PUT' },
      { value: '4', label: 'DELETE' },
      { value: '5', label: 'HEAD' },
      { value: '6', label: 'CONNECT' },
      { value: '7', label: 'OPTIONS' },
      { value: '8', label: 'TRACE' },
      { value: '9', label: 'PATCH' }
    ];
    const {title, path, teamId, isHttps, method, des, isEditorContent, content} = this.state;
    const httpsStyle = isHttps ? '50px' : '0px';
    return (
      <div className='fk-api'>
        <div className='row'>
          <label htmlFor="api-name">接口名称：</label>
          <input type="text" value={title} data-type='title' onChange ={this.inputChange} name='api-name' />
        </div>

        <div className='row'>
          <label htmlFor="api-method">请求类型：</label>
          <Select name="api-method"  className="ck-select" data-type='method' value={method} onChange={this.selectChange} options={selectOptions} />
        </div>

        <div className='row'>
          <label htmlFor="api-path">接口路径：</label>
          <button className='rand-path button' onClick={this.randPath}>生成随机路径</button>
          <input type="text" name='api-path' data-type='path' value={path} onChange = {this.inputChange} />
        </div>



        <div className='row https'>
          <label htmlFor="api-https">开启https：</label>
          <div className='warp' onClick={this.changeHttps}>
            <div className='close'></div>
            <div className='open'></div>
            <div className='chunk' style={{ left: httpsStyle }}></div>
          </div>
        </div>

        <div className='row'>
          <label htmlFor="api-des">接口描述：</label>
          <input type="text" name='api-des' value={des} data-type='des' onChange={this.inputChange}/>
        </div>

        <div className='row'>
          <label htmlFor="api-content">接口内容：</label>
          <button className='check-editor button' onClick={this.changeEditor}>{isEditorContent ? '保存JSON' : '编辑JSON'}</button>
        </div>

        <div className='row'>
          <label htmlFor="api-content"></label>
          <div id='jsonEditor' className= {isEditorContent ? 'json-editor' : 'hide'}  ></div>
          <textarea name='api-content' value={JSON.stringify(content) } onChange={this.textareaChange}  id="" cols="30" rows="10" className={isEditorContent ? 'hide' : 'json-erea'}></textarea>
        </div>



        <div className='control'>
          <input className='submit' onClick={this.submitData} type ="button" value ="保存" />
          <Link to={'/team/' + teamId}>
            <input className='quit' type ="button" value ="取消" />
          </Link>
        </div>
      </div>
    );
  }
}

Api.contextTypes = { router: router };

export default connect(mapStateToProps, mapDispatchToProps)(Api);