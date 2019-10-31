# day01

## 1. 项目开发准备

1. 描述项目
2. 技术选型
3. API 接口/接口文档/测试接口

## 2. 启动项目开发

1. 使用 react 脚手架创建项目
2. 开发环境运行：npm start
3. 生产环境打包运行： npm run build / serve build

## 3. git 管理项目

1. 创建远程仓库
2. 创建本地仓库
   - 配置 .gitignore
   - git init
   - git add .
   - git commit -m "init"
3. 将本地仓库推送到远程仓库
   - git remote add orgin url
   - git push origin master
4. 在本地创建 dev 分支，并推送到远程
   - git checkout -b dev
   - git push origin dev
5. 如果本地有修改
   - git add .
   - git commit -m "xxx"
   - git push origin dev
6. 新的同事：克隆仓库
   - git clone url
   - git checkout -b dev origin/dev
   - git pull origin dev
7. 如果远程修改
   - git pull origin dev

## 4. 创建项目的基本结构

1. api：ajax 请求的模块
2. components：非路由模块
3. pages：路由模块
4. App.js：应用的根组件
5. index.js：入口 js

## 5. 引入 antd

1. 下载 antd 的包
2. 按需打包：只打包 import 引入组件的 js/css

   - 下载工具包
   - config-overrides.js
   - package.json

3. 自定义主题

   - 下载工具包
   - config-overrides.js

4. 使用 antd 的组件
   - 根据 antd 的文档编写

## 6. 引入路由

1. 下载包： react-router-dom
2. 拆分应用路由：
   - Login：登陆
   - Admin：后台管理界面
3. 注册路由：
   - `<BrowserRouter>`
   - `<Switch>`
   - `<Route path='' component={}/>`

## 7. Login 的静态组件

1. 自定义一部分样式布局
2. 使用 antd 的组件实现登陆表单界面
   - Form / Form.Item
   - Input
   - Icon
   - Button

## 8. 收集表单数据和表单的前台验证

1. form 对象
   - 如何让包含`<Form>`的组件得到 form 对象？ WrapLoginForm
   - WrapLoginForm 是 LoginForm 的父组件，它给 LoginForm 传入 form 属性
   - 用到了高阶函数和高阶组件的技术
2. 操作表单数据
   - `form.getFieldDecorator('标识名称', {initialValue: 初始值, rules: []})(<Input/>)`包装表单组件标签
   - `form.getFieldsValue()`：得到包含所有输入数据的对象
   - `form.getFieldValue(id)`：根据标识得到对应字段输入的数据
3. 前台表单验证
   - 声明式实时表单验证：
     - `form.getFieldDecorator('标识名称', {rules: [{min: 4, message: '错误提示信息'}]})(<Input/>)`
   - 自定义表单验证
     - `form.getFieldDecorator('标识名称', {rules: [{validator: this.validatePwd}]})(<Input/>)`
     - validatePwd = (rule, value, callback) => {
       if(有问题) callback('错误提示信息') else callback()
       }
   - 点击提交时统一验证
     - form.validateFields((error, values) => {
       if(!error) {通过了验证，发送 ajax 请求}
       })

## 9. 高阶函数与高阶组件

1. 高阶函数
   - 一类特别的函数
     - 接收函数类型的参数
     - 返回值是函数
   - 常见
     - 定时器：setTimeout()/setInterval()
     - Promise: Promise(() => {}) then(value => {}, reason => {})
     - 数组遍历相关的方法: forEach()/filter()/map()/reduce()/find()/findIndex()
     - 函数对象的 bind()
     - Form.create()() / getFieldDecorator()
   - 高阶函数更加动态，更加具有扩展性
2. 高阶组件

   - 本质就是一个函数
   - 接收一个组件(被包装组件)，返回一个新的组件(包装组件)，包装组件会向被包装组件传入特定属性
   - 作用：扩展组件的功能

3. 高阶组件与高阶函数的关系
   - 高阶组件是特别的高阶函数
   - 接收一个组件函数，返回一个新的组件函数

day02

## 1. 后台应用

1. 启动后台应用： mongodb 服务必须启动
2. 使用 postman 测试接口(根据接口文档)：
   - 访问测试：post 请求的参数在 body 中设置
   - 保存测试接口
   - 导出/导入所有测试接口

## 2. 编写 ajax 代码

1. ajax 请求函数模块：api/ajax.js
   - 封装 axios + Promise
   - 函数的返回值是 promise 对象 ===> 后面用上 async/await
   - 自己创建 Promise
     - 内部统一处理请求异常：外部的调用都不要使用 try..catch 来处理请求异常
     - 异步返回时响应数据(而不是想要对象)：外部的调用异步得到的就直接是数据了(response --> response.data)
2. 接口请求函数模块：api/index.js
   - 根据接口文档编写(一定要具备这个能力)
   - 接口请求函数：使用 ajax()，返回值 promise 对象
3. 解决 ajax 跨域请求问题(开发时)
   - 办法：配置代理 ==> 只能解决开发环境
   - 编码：package.json：`proxy: "http://localhost:6000"`
4. 对代理的理解
   - 是什么
     - 具有特定功能的程序
   - 运行在哪
     - 前台应用端
     - 只能在开发时使用
   - 作用
     - 解决开发时的 ajax 请求跨域问题
     - 监视并拦截请求(3000)
     - 转发请求(6000)
   - 配置代理
     - 告诉代理服务器一些信息：比如转发的目标地址
     - 开发环境：前端工程师
     - 生产环境：后台工程师
5. async 和 await
   - 作用
     - 简化 promise 对象的使用：不用再使用 then()来指定成功/失败的回调函数
     - 以同步编码(没有回调函数)方式实现异步流程
   - 哪里写 await
     - 在返回 promise 的表达式左侧写 await：不想要 promise，想要 promise 异步执行成功的 value 数据
   - 哪里写 async
     - await 所在函数(最近的)定义的左侧写 async

## 3. 实现登录(包含自动登录)

1. login.jsx
   - 调用登陆的接口请求
   - 如果失败，显示错误提示信息
   - 如果成功了
     - 保存 user 到 local/内存中
     - 跳转到 admin
   - 如果内存中的 user 有值，自动跳转到 admin
2. src/index.js
   - 读取 local 中 user 到内存中保存
3. admin.jsx
   - 判断如果内存中没有 user(\_id 没有值)，自动跳转到 login
4. storageUtils.js
   - 包含使用 localStorage 来保存 user 相关操作的工具模块
   - 使用第三方库 store
     - 简化编码
     - 兼容不同的浏览器
5. memoryUtils.js
   - 用来在内存中保存数据(user)的工具类

## 4. 搭建 admin 的整体界面结构

1. 整体布局使用 antd 的 Layout 组件
2. 拆分组件：
   - LeftNav：左侧导航
   - Header：右侧头部
3. 子路由
   - 定义路由组件
   - 注册路由

## 5. LeftNav 组件

1. 使用 antd 组件

   - Menu/Item/SubMenu

2. 使用 react-router-dom
   - withRouter()：包装非路由组件，给其传入history/location/match属性
   - history：push()/replace()/goBack()
   - location：pathname属性
   - match：params属性

3. componentWillMount与componentDidMount的比较
   - componentWillMount：在第一次render()前调用一次，为第一次render()准备数据(同步)
   - componentDidMount：在第一次render()之后调用一次，启动异步任务，后面异步更新状态重新render

4. 根据动态生成Item和SubMenu数组
   - map() + 递归：多级菜单列表
   - reduce() + 递归：多级菜单列表

5. 2个问题
   - 刷新时如何选中对应的菜单项
   - 刷新子菜单路径时，自动打开子菜单列表
