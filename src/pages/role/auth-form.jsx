import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Tree, Form, Input} from 'antd';
import menuList from '../../config/menuConfig';

const Item = Form.Item;
const { TreeNode } = Tree;

export default class AuthForm extends Component {

  static propTypes = {
    role: PropTypes.object.isRequired
  }

  constructor(props){
    super(props);

    // 根据传入角色的menus生成初始状态
    const {menus} = props.role;
    this.state = {
      checkedKeys: menus
    }
  }

  // 为父组件提交获取最新menus数据的方法
  getMenus = () => this.state.checkedKeys

  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )
      return pre;
    }, []);
  }

  // 选中某个node时的回调
  onCheck = checkedKeys => {
    // console.log(checkedKeys);
    this.setState({checkedKeys});
  }

  componentWillMount() {
    this.treeNodes = this.getTreeNodes(menuList);
  }

  // 根据新传入的role来更新checkedKeys状态
  // 当组件接收到新的属性时自动调用
  componentWillReceiveProps(nextProps) {
    const {menus} = nextProps.role;
    this.setState({
      checkedKeys: menus
    });
  }

  render(){
    
    const {role} = this.props;
    const {checkedKeys} = this.state;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 }
    }
    return (
      <div>
        <Item label='角色名称' {...formItemLayout}>
          <Input value={role.name} disabled/>
        </Item>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        >
          <TreeNode title="平台权限" key="all">
            {
              this.treeNodes
            }
          </TreeNode>
        </Tree>
      </div>  
    )
  }
}