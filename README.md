#webpack+vue.js重构的cnode社区的单页面(spa)应用

###安装

安装第三方npm模块</br>
npm install

第一种本地打开</br>
1.运行webpack打包</br>
2.将webpack.config的publicPath : __dirname + '/build/'</br>
3.直接本地打开index.html

第二种服务器打开</br>
1.运行npm start热替换模式，代理待本地的http://localhost:8080端口</br>
2.设置webpack.config的publicPath : '/build/'</br>
3.访问http://localhost:8080



###文件目录
<pre>
###开发目录
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
│   ├── components     // 各种子组件
│   |    ├──header.vue
│   |    ├──returnTop.vue
│   |    ├──menu.vue
│   ├── js             // 外部引入的js文件
│   ├── scss           //scss文件
│   ├── img           //图片文件
│   ├── filters.js     //过滤器
│   └── main.js        // Webpack 预编译入口	
└── webpack.js  	   // Webpack 配置文件
</pre>

###效果预览
![image](https://github.com/cwsjoker/Cnode-vue-spa/blob/master/src/img/demo.gif)
