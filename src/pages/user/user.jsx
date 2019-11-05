import React, {Component} from 'react';
import {Card, Table, Modal, Button, message} from 'antd';

import UserForm from './user-form';

import {reqUsers, reqDeleteUser, reqAddOrUpdateUser} from '../../api';

import {PAGE_SIZE} from '../../utils/constants.js';
import {formatDate} from '../../utils/dateUtils';

import LinkButton from '../../components/link-button/link-button';

/* 
用户路由
*/
export default class User extends Component {

  state = {
    user: [],   // 所有的用户列表
    roles: [],  // 所有角色的列表
    isShow: false, // 是否显示确认框
  }
  
  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formatDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (role_id) => this.roleNames[role_id]
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton onClick={() => {this.showUpdate(user)}}>修改</LinkButton>
            <LinkButton onClick={() => {this.deleteUser(user)}}>删除</LinkButton>
          </span>
        )
      },
    ]
  }

  // 根据role的数组，生成包含所有角色名的对象(属性名用角色id值)
  initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name;
      return pre
    }, {});
    // 保存
    this.roleNames = roleNames;
  }

  // 显示修改界面
  showUpdate = (user) => {
    this.setState({
      isShow: true
    });
    this.user = user;
  }

  // 显示添加界面
  showAdd = () => {
    this.user = null;   // 去除前面保存的user
    this.setState({isShow: true});
  }
  // 删除指定用户
  deleteUser = (user) => {
    Modal.confirm({
      title: `确认删除${user.username}吗？`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id);
        if(result.status === 0){
          message.success('删除用户成功', 1);
          this.getUsers();
        }
      }
    });
  }

  // 添加/更新用户
  addOrUpdateUser = () => {
    // 1. 收集输入数据
    this.form.validateFields(async (err, values) => {
      if(!err) {
        const user = values;
        this.form.resetFields();
        // 如果是更新，需要给user指定_id属性
        if(this.user && this.user._id){
          user._id = this.user._id;
        }
        // 2. 提交添加的请求
        const result = await reqAddOrUpdateUser(user);
        if(result.status === 0){
          // 3. 更新列表显示
          message.success(`${this.user?'修改':'添加'}用户成功`, 1);
          this.getUsers();
          this.setState({
            isShow: false
          });
        }
      }   
    });
  }

  getUsers = async () => {
    const result = await reqUsers();
    if(result.status === 0){
      const {users, roles} = result.data;
      this.initRoleNames(roles);
      this.setState({users, roles});
    }else {
      message.error('获取用户失败', 1);
    }
  }

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getUsers();
  }
  render() {

    const {users, roles, isShow} = this.state;
    const {user} = this;

    const title = (
      <Button type='primary' onClick={this.showAdd}>
        创建用户
      </Button>
    )
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={users}
          columns={this.columns}
          pagination={{defaultPageSize: PAGE_SIZE, showQuickJumper: true}}
        />
        <Modal
          title={user ? '修改用户': '添加用户'}
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={() => {
            this.setState({isShow: false}); 
            this.form.resetFields();
          }}
        >
          <UserForm
            setForm={(form) => {this.form = form}}
            user={user}
            roles={roles}
          />
        </Modal>
      </Card>
    )
  }
}