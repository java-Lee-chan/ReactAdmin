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

   - withRouter()：包装非路由组件，给其传入 history/location/match 属性
   - history：push()/replace()/goBack()
   - location：pathname 属性
   - match：params 属性

3. componentWillMount 与 componentDidMount 的比较

   - componentWillMount：在第一次 render()前调用一次，为第一次 render()准备数据(同步)
   - componentDidMount：在第一次 render()之后调用一次，启动异步任务，后面异步更新状态重新 render

4. 根据动态生成 Item 和 SubMenu 数组

   - map() + 递归：多级菜单列表
   - reduce() + 递归：多级菜单列表

5. 2 个问题
   - 刷新时如何选中对应的菜单项
   - 刷新子菜单路径时，自动打开子菜单列表

day03

## 1. Header 组件

1. 界面静态布局
   - 三角形效果
2. 获取登录用户的名称显示
   - memoryUtils
3. 当前时间
   - 循环定时器，每个 1s 更新当前时间状态
   - 格式化指定时间：dateUtils
4. 天气预报
   - 使用 jsonp 库发 jsonp 请求百度天气预报接口
   - 对 jsonp 请求的理解
5. 当前导航项的标题
   - 得到当前请求的路由 path: withRouter()包装非路由组件
   - 根据 path 在 menuList 中遍历查找对应的 item 的 title
6. 退出登录
   - Modal 组件显示提示
   - 清除保存的 user
   - 跳转到 login

## 2. jsonp 解决 ajax 跨域的原理

1. jsonp 只能解决 GET 类型的 ajax 请求跨域问题
2. jsonp 请求不是 ajax 请求，而是一般的 get 请求
3. 基本原理
   - 浏览器端：
     - 动态生成`<script>`来请求后台接口(src 就是接口的 url)
     - 定义好用于接收响应数据的函数(fn)，并将函数名通过请求参数提交给后台(如：callback=fn)
   - 服务器端：
     - 接收到请求处理产生结果数据后，返回一个函数调用的 js 代码，并将结果数据作为实参传入函数调用
   - 浏览器端：
     - 收到响应自动执行函数调用的 js 代码，也就执行了提前定义好的回调函数，并得到了需要的结果数据

day04：Category 组件

## 1. 使用 antd 组件构建分类列表界面

1. Card
2. Table
3. Button
4. Icon

## 2. 相关接口请求函数

1. 获取一级/二级分类列表
2. 添加分类
3. 更新分类

## 3. 动态显示一级分类列表

1. 设计一级分类列表的状态：categorys
2. 异步获取一级分类列表：componentDidMount(){}
3. 更新状态，显示

## 4. 显示二级分类列表

1. 设计状态：subCategorys/parentId/parentName
2. 显示二级分类列表：根据 parentId 状态值，异步获取分类列表
3. setState()的问题
   - setState()更新状态是异步更新的，直接读取状态值还是旧的状态值
   - setState({}, [callback])，回调函数是在状态更新且界面更新之后执行，可以在此获取最新的状态

## 5. 更新分类

1. 界面

   - antd 组件：Modal, Form, Input
   - 显示/隐藏：showStatus 状态为 2/0

2. 功能
   - 父组件(Category)得到子组件(UpdateForm)的数据(form)
   - 调用更新分类的接口
   - 重新获取分类列表

day05

## 1. 添加分类

1. 界面
   - antd 组件：Modal，Form，Select，Input
   - 显示/隐藏：showStatus 状态为 1/0
2. 功能：
   - 父组件(Category)得到子组件(AddForm)的数据(form)
   - 调用更新分类的接口
   - 重新获取分类列表

## 2. Product 整体路由

1. 配置子路由：

   - ProductHome / ProductDetail / ProductAddUpdate
   - `<Route>` / `<Switch>` / `<Redirect>`

2. 匹配路由的逻辑
   - 默认：逐层匹配 `<Route path='/product' component={ProductHome} />`
   - exact 属性：完全匹配

## 3. 分页列表(2 种)

1. 纯前台分页
   - 请求获取数据：一次性获取所有数据，翻页时不需要再发请求
   - 请求接口：
     - 不需要指定请求参数：页码(pageNum)和每页数量(pageSize)
     - 响应数据：所有数据的数组
2. 基于后台的分页
   - 请求获取数据：每次只获取当前页的数据，翻页时要再发请求
   - 请求接口：需要指定请求参数：页码(pageNum)和每页数量(pageSize)
   - 响应数据：当前页数据的数组 + 总记录数(total)
3. 如何选择
   - 基本根据数据多少来选择

## 4. ProductHome 组件

1. 分页显示

   - 界面：Card / Table / Select / Icon / Input / Button
   - 状态： products/ total
   - 接口请求函数需要的数据：pageNum，pageSize
   - 异步获取第一页数据显示
     - 调用分页的接口请求函数，获取到当前页的 products 和总记录数 total
     - 更新状态：products / total
   - 翻页：
     - 绑定翻页的监听，监听回调需要得到 pageNum
     - 异步获取指定页码的数据显示

2. 搜索分页

   - 接口请求函数需要的数据：
     - pageSize：每页的条目数
     - pageNum：当前请求第几页(从 1 开始)
     - productDesc / productName: searchName 根据商品描述/名称搜索
   - 状态：searchType / searchName / 在用户操作时实时收集数据
   - 异步搜索显示分页列表
     - 如果 searchName 有值，调用搜索的接口请求函数获取数据并更新状态

3. 更新商品的状态

   - 初始显示：根据 product 的 status 属性来显示 status = 1/2
   - 点击切换：
     - 绑定点击监听
     - 异步请求更新状态

4. 进入详情页面

   - `history.push('product/detail', {product})`

5. 进入添加界面
   - `history.push('/product/addupdate')`

## 5. ProductDetail 组件

1. 读取商品数据：location.state.product
2. 显示商品信息
3. 异步显示商品所属分类的名称
   - pCategoryId==0: 异步获取 categoryId 的分类名称
   - pCategoryId!=0: 异步获取 pCategoryId/categoryId 的分类名称
4. Promise.all([promise1, promise2])
   - 返回值是 promise
   - 异步得到的是所有 promise 的结果的数组
   - 特点：一次发多个请求，只有当所有请求都成功，才成功，并得到成功的数据，一旦有一个失败，就失败

day06

## 1. ProductAddUpdate

1. 基本界面
   - Card / Form / Input / TextArea / Button
   - FormItem的label标题和layout

2. 分类的级联列表
   - Cascader的基本使用
   - 异步获取一级分类列表，生成一级分类options
   - 如果当前是更新二级分类的商品，异步获取对应的二级分类列表，生成二级分类options，并添加为对应option的children
   - async 函数返回值是一个新promise对象，promise的结果和值由async函数的结果决定
   - 当选择某个一级分类项时，异步获取对应的二级分类列表，生成二级分类options，并添加为对应option的children

3. 表单数据收集与表单验证

## 2. PicturesWall

1. antd组件
   - Upload / Modal / Icon
   - 根据实例DEMO改造编写

2. 上传图片
   - 在`<Upload>`上配置接口的path和请求参数名
   - 监视文件状态的改变，上传中 / 上传完成 / 删除
   - 在上传成功后，保存好相关消息：name / url
   - 为父组件提供获取已上传图片文件名数组的方法

3. 删除图片
   - 当文件状态变为删除时，调用删除图片的接口删除上传到后台的图片

4. 父组件调用子组件对象的方法：使用 ref 技术
   - 创建ref容器：this.pw = React.createRef
   - 将ref容器交给需要获取的标签对象：`<PicturesWall ref={this.pw}/>` 自动将标签对象添加为pw对象
   - 通过ref容器读取标签元素：this.pw.current

day07

## 1. RichTextEditor

1. 使用基于react的富文本编辑器插件库:react-draft-wysiwyg
2. 参考库的DEMO和API文档编写
3. 如果还有不确定的，百度搜索，指定相对准确的关键字

## 2. 完成商品添加与修改功能

1. 收集输入数据

   - 通过form收集：name/desc/price/pCategoryId/categoryId
   - 通过ref收集：imgs/detail
   - 如果是更新收集：_id
   - 将收集数据封装成product对象

2. 更新商品

   - 定义添加和更新的接口请求函数
   - 调用接口请求函数，如果成功就返回商品列表界面

## 3. 角色管理

1. 角色前台分页显示

2. 添加角色

3. 给指定角色授权
   - 界面：Tree
   - 状态：checkedKeys，根据传入的role的menus进行初始化
   - 勾选某个Node时，更新checkedKeys
   - 点击OK时：通过ref读取到子组件的checkedKeys作为要更新role的新的menus
     - 发请求更新role
   - 解决默认勾选不正常的bug：利用组件的componentWillReceiveProps()

