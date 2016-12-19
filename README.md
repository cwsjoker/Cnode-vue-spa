#webpack+vue.js重构的cnode社区的单页面(spa)应用
###[1.0线上预览地址](https://cwsjoker.github.io/mystatic/CNode_Vue_Spa/index.html)

##Installation##
安装第三方npm模块依赖</br>
<pre>npm install</pre>

##Usage##

生产环境</br>
1.运行npm run build打包</br>
2.直接本地打开index.html访问

开发环境</br>
1.运行npm run dev热替换模式，代理到本地的http://localhost:8080端口</br>
2.访问http://localhost:8080

##技术栈##
1.vue-router-路由切换，vue-resource-Ajax请求</br>
2.vuex引入保存用户信息，弹窗状态信息</br>
3.es6+vue.js开发</br>
4.webpack打包构建

##项目进度##
已实现：主题列表页，主题详情页(收藏，点赞，评论)，用户登录，个人主页, 消息模块，创建主题与修改主题</br>
待实现：1.0版本已重写完成，2.0正在重构中(将对整体架构作出改变，不单单是简单的完成对1.0的升级，敬请期待)

##文件目录
<pre>
##开发目录
├── README.md           
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── vue            // 组件
│   |    ├──about.vue
│   |    ├──artlist.vue
│   |    ├──article.vue
│   |    ├──login.vue
│   |    ├──loading.vue
│   |    ├──search.vue
│   |    ├──userhome.vue
│   |    ├──usermessage.vue
│   |    ├──userset.vue
│   |    ├──createtopic.vue
│   |    ├──edittopic.vue
│   ├── components     // 各种子组件
│   |    ├──header.vue
│   |    ├──returnTop.vue
│   |    ├──menu.vue
│   |    ├──reply.vue
│   |    ├──tips.vue
│   |    ├──topicbox.vue
│   ├── vuex     // vuex
│   |    ├──action.js
│   |    ├──getters.js
│   |    ├──store.js
│   ├── js             // 外部引入的js文件
│   ├── scss           //scss文件
│   ├── img           //图片文件
│   ├── filters.js     //过滤器
│   └── main.js        // Webpack 预编译入口	
└── webpack.js  	   // Webpack 配置文件
</pre>

##效果预览
![image](https://github.com/cwsjoker/Cnode-vue-spa/blob/master/src/img/demo.gif)
