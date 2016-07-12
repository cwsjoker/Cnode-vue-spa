#webpack+vue.js重构的cnode社区的单页面(spa)应用

###安装

安装第三方npm模块</br>
npm install

1.运行webpack打包</br>
2.如果要打开npm start热替换进行开发，将webpack.config 的   publicPath : __dirname + '/build/' 改为    publicPath : '/build/'

直接打开index.html测试


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
