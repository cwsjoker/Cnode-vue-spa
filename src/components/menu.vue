<template>
	<div class="meun" :class="{'showMeun':showm}">
		<div class="user_info" v-if="userLoginState" v-link="{name:'userhome',params:{username:this.user_name}}">
			<div class="avatar">
				<img :src="user_avatar" alt="">
			</div>
			<div class="name">
				<p v-text="user_name"></p>
			</div>
		</div>
		<ul>
			<li v-link="{name:'home'}">首页</li>
			<li v-link="{name : 'search'}">搜索</li>
			<li v-link="{name : 'login'}" v-if="!userLoginState">登录</li>
			<li v-link="{name : 'usermessage'}" v-if="userLoginState">未读消息<em v-if="ache_getNotMessageCount !== 0" class="message-count">{{ache_getNotMessageCount}}</em></li>
			<li v-if="userLoginState">设置</li>
			<li v-link="{name : 'createtopic'}" v-if="userLoginState">发布话题</li>
			<li v-link="{name : 'about'}">关于</li>
		</ul>
	</div>
</template>
<script>
	import store from '../vuex/store';
	import {getLoginState, getUserInfo, getNotMessageCount} from '../vuex/getters';
	export default {
		props : ['showm'],
		data : function() {
			return {
				user_name : this.getUserInfo.loginname || '',
				user_avatar : this.getUserInfo.avatar || ''
			}
		},
		vuex : {
			getters : {
				userLoginState : getLoginState,
				getUserInfo :  getUserInfo,
				ache_getNotMessageCount : getNotMessageCount
			}
		}
	}
</script>
<style lang="sass">
	.meun {
		position: fixed;
		top: 0px;
		left:-200px;
		width: 200px;
		height: 100%;
		background: #444444;
		transition: all .3s ease;
		z-index: 99;
		.user_info {
			padding-top : 20px;
			width : 100%;
			.avatar {
				width : 100%;
				height : 40px;
				text-align : center;
				img {
					width : 40px;
					height : 40px;
					border-radius : 20px;
					cursor : pointer;
				}
			}
			.name {
				width : 100%;
				p {
					width : 100%;
					padding : 5px 0;
					color : #fff;
					font-size : 14px;
					text-align : center;
				}
			}
		}
		ul {
			padding: 20px 0;
			li {
				position: relative;
			    color: #fff;
			    padding: 16px 0;
			    text-align: left;
			    text-indent: 10px;
			    line-height: 20px;
			    font-size: 20px;
			    margin: 0 25px;
			    .message-count {
			    	position: absolute;
				    display: inline-block;
				    top: 20px;
				    left: 100px;
				    width: 16px;
				    height: 16px;
				    background: #80bd01;
				    border-radius: 8px;
				    text-indent: 0px;
				    text-align: center;
				    font-size: 12px;
				    line-height: 16px;
			    }
			}
		}
	}
	.showMeun {
		transform: translateX(200px);
	}
</style>