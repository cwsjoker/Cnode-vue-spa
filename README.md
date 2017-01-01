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
1.vue-router-路由切换，axios-Ajax请求</br>
2.vuex+localStorage引入保存用户信息，弹窗状态信息</br>
3.es6+vue2.0.js开发</br>
4.webpack打包构建

##项目进度##
2.0已实现全部功能有：
主题列表页，主题详情页(收藏，点赞，评论)，用户登录，个人主页, 消息模块，创建主题与修改主题

##文件目录
<pre>
##开发目录
├── README.md           
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── vue            // 组件
│   |    ├──home.vue
│   |    ├──about.vue
│   |    ├──articleList.vue
│   |    ├──article.vue
│   |    ├──login.vue
│   |    ├──userhome.vue
│   |    ├──usermessage.vue
│   |    ├──createtopic.vue
│   |    ├──edittopic.vue
│   ├── components      // 子组件
│   |    ├──header.vue
│   |    ├──returnTop.vue
│   |    ├──menu.vue
│   |    ├──reply.vue
│   |    ├──tips.vue
│   |    ├──topicbox.vue
│   ├── store          // vuex
│   |    ├──index.js
│   ├── filters        // 过滤器
│   |    ├──index.js
│   ├── js             // 外部引入的js文件
│   ├── css            //css文件
│   ├── img            //图片文件
│   └── main.js        // Webpack 预编译入口	
└── webpack.js  	   // Webpack 配置文件
</pre>

