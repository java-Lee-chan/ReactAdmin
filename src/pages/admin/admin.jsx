import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import { Layout } from 'antd';
import {connect} from 'react-redux';

import LeftNav from '../../components/left-nav/left-nav';
import Header from '../../components/header/header';
import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';
import NotFound from '../not-found/not-found';

const { Footer, Sider, Content } = Layout;
/* 
后台管理的路由组件
*/

class Admin extends Component {

  render() {
    const user = this.props.user;
    // 如果内存中没有存储user ==> 当前没有登陆
    if(!user || !user._id){
      // 自动跳转到登陆(在render()中)
      return <Redirect to='/login'/>
    }
    return (
      <Layout style={{minHeight: '100%'}}>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{margin: 20, backgroundColor: 'white'}}>
            <Switch>
              <Redirect from='/' to='/home' exact/>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              {/* 上面没有一个匹配，直接显示 */}
              <Route component={NotFound}/>
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center', color: '#cccccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {}
)(Admin);