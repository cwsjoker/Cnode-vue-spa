"use strict";

import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	// 页面打开默认设置登录状态为否
	isLogin : false
}

const mutations = {
	ISLOGIN (state) {
		state.isLogin = true;
	},
	NOTLOGIN () {
		state.isLogin = false;
	}
}

export default new Vuex.Store({
	state,
	mutations
})