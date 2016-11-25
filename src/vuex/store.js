"use strict";

import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	// 页面打开默认设置登录状态为否
	isLogin : false,
	// 保存登录信息
	userInfo : {
		'loginname' : '',
		'avatar' : '',
		'id' : '',
		'accesstoken' : ''
	},
	tipContent : '',
	tipShow : false,
	message_count : 0
}

const mutations = {
	// 设置登录
	ISLOGIN (state) {
		state.isLogin = true;
	},
	// 退出登录
	NOTLOGIN (state) {
		state.isLogin = false;
	},
	// 设置登录用户信息
	SETUSERINFO (state, name, avatar, id, accesstoken) {
		state.userInfo.loginname = name;
		console.log(state.userInfo.loginname);
		state.userInfo.avatar = avatar;
		state.userInfo.id = id;
		state.userInfo.accesstoken = accesstoken;
	},
	// 设置tips弹窗的提示信息
	SETTIPCONTENT (state, content) {
		state.tipContent = content;
	},
	// 设置tips弹窗的显示隐藏状态
	SETTIPSHOW (state, status) {
		state.tipShow = status;
	},
	// 设置未读消息条数
	SETNOTMESSAGECOUNT (state, count) {
		state.message_count = count;
	}

}

export default new Vuex.Store({
	state,
	mutations
})