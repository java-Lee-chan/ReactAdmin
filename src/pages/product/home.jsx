import React, {Component} from 'react';

import {Card, Select, Input, Table, Button, Icon, message} from 'antd';
import LinkButton from '../../components/link-button/link-button';

import {reqProducts, reqSearchProducts, reqUpdateStatus} from '../../api';
import {PAGE_SIZE} from '../../utils/constants';
import memoryUtils from '../../utils/memoryUtils';

const Option = Select.Option;
/* 
Product的默认子路由组件
*/
export default class ProductHome extends Component {
  
  state = {
    total: 0, // 商品的总数量
    products: [], // 商品的数组
    loading: false, // 是否正在加载中
    searchName: '',  // 搜索关键字
    searchType: 'productName',  // 根据哪个字段搜索
  }

  // 初始化table的列的数组
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '￥' + price  // 当前指定了对应的属性，传入的是对应的属性值
      },
      {
        title: '状态',
        width: 100,
        // dataIndex: 'status',
        render: (product) => {
          const {status, _id} = product;
          return (
            <span>
              <Button 
                type='primary' 
                onClick={() => this.updateStatus(_id, status===1?2:1)}
              >
                {status === 1 ? '下架' : '上架'}
              </Button>
              <span>{status === 1 ? '在售' : '已下架'}</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        width: 100,
        render: (product) => (
          <span>
            {/* 将product对象作为state传递给目标路由组件 */}
            <LinkButton onClick={() => this.showDetail(product)}>详情</LinkButton>
            <LinkButton onClick={() => this.showUpdate(product)}>修改</LinkButton>
          </span>
        )
      },
    ];
  }

  // 显示商品详情界面
  showDetail = (product) => {
    // 缓存product对象 ==> 给detail组件使用
    memoryUtils.product = product
    this.props.history.push('/product/detail');
  }
  
  // 显示修改商品界面
  showUpdate= (product) => {
    // 缓存product对象 ==> 给update组件使用
    memoryUtils.product = product
    this.props.history.push('/product/addUpdate');
  }
  // 获取指定页码的列表数据显示
  getProducts = async (pageNum) => {
    this.pageNum = pageNum; // 保存pageNum，让其他方法可以看到
    this.setState({loading: true});
    const {searchName, searchType} = this.state;
    let result;
    // 如果搜索关键字有值，说明进行搜索分页
    if(searchName){
      result = await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchName, searchType})
    }else { // 一般分页
      result = await reqProducts(pageNum, PAGE_SIZE);
    }
    this.setState({loading: false});  //隐藏loading
    if(result.status === 0){
      // 取出分页数据，更新状态，显示分页列表
      const {list, total} = result.data; 
      this.setState({
        total,
        products: list
      });
    }
  }

  // 更新指定商品的状态
  updateStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status);
    if(result.status === 0){
      message.success('更新商品成功', 1);
      this.getProducts(this.pageNum);
    }
  }

  componentWillMount() {
    this.initColumns();
  }
  componentDidMount() {
    this.getProducts(1);
  }
  
  render() {
    const {products, total, loading, searchName, searchType} = this.state;

    const title = (
      <span>
        <Select 
          style={{width: 120}} 
          value={searchType} 
          onChange={val => this.setState({searchType: val})}
        >
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input 
          placeholder='关键字' 
          style={{width: 150, margin: '0 15px'}} 
          value={searchName} 
          onChange={e => this.setState({searchName: e.target.value})}
        />
        <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
      </span>
    );
    const extra = (
      <Button type='primary' onClick={() => this.props.history.push('/product/addupdate')}>
        <Icon type='plus'/>
        <span>添加商品</span>
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey='_id'
          loading={loading}
          dataSource={products} 
          columns={this.columns}
          pagination={{
            current: this.pageNum,
            total, 
            defaultPageSize: PAGE_SIZE, 
            showQuickJumper: true,
            onChange: this.getProducts
          }}
        />
      </Card>
    )
  }
}