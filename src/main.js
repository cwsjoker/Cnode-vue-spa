var Vue = require('vue');
var VueRouter = require('vue-router');
//引入css重置文件,基本的样式文件
require('./css/reset.css');
// 引入px与rem的换算
require('./js/equ.js');

//实例化vue模块 
Vue.use(VueRouter);

const Home = resolve => {
    require.ensure(['./App.vue'], () => {
        resolve(require('./App.vue'));
    });
};
const List = resolve => {
    require.ensure(['./vue/list.vue'], () => {
        resolve(require('./vue/list.vue'));
    });
};
const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },{
        path: '/list',
        name: 'list',
        component: List
    },{
        path: '*',
        component: Home
    }];
const router = new VueRouter({
    mode: 'history',
    routes
});
new Vue({
    router: router
}).$mount('#app');