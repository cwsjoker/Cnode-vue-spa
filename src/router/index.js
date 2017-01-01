import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const articleList = resolve => {
    require.ensure(['../vue/articleList.vue'], () => {
        resolve(require('../vue/articleList.vue'));
    });
};
const about = resolve => {
    require.ensure(['../vue/about.vue'], () => {
        resolve(require('../vue/about.vue'));
    });
};
const login = resolve => {
    require.ensure(['../vue/login.vue'], () => {
        resolve(require('../vue/login.vue'));
    });
}
const article = resolve => {
    require.ensure(['../vue/article.vue'], () => {
        resolve(require('../vue/article.vue'));
    });
}
const userhome = resolve => {
    require.ensure(['../vue/userhome.vue'], () => {
        resolve(require('../vue/userhome.vue'));
    });
}
const usermessage = resolve => {
    require.ensure(['../vue/usermessage.vue'], () => {
        resolve(require('../vue/usermessage.vue'));
    });
}
const createtopic = resolve => {
    require.ensure(['../vue/createtopic.vue'], () => {
        resolve(require('../vue/createtopic.vue'));
    });
}
const edittopic = resolve => {
    require.ensure(['../vue/edittopic.vue'], () => {
        resolve(require('../vue/edittopic.vue'));
    });
}
const routes = [{
        path: '/',
        name: 'articleList',
        component: articleList
    },{
        path: '/login',
        name: 'login',
        component: login
    },{
        path: '/about',
        name: 'about',
        component: about
    },{
        path: '/article/:id',
        name: 'article',
        component: article
    },{
        path: '/userhome/:username',
        name: 'userhome',
        component: userhome
    },{
        path: '/usermessage',
        name: 'usermessage',
        component: usermessage
    },{
        path: '/createtopic',
        name: 'createtopic',
        component: createtopic
    },{
        path: '/edittopic/:topicid',
        name: 'edittopic',
        component: edittopic
    },{
        path: '*',
        component: articleList
    }];

export default new Router({
    mode: 'history',
    base: __dirname,
    routes
});