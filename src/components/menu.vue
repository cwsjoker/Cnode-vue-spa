<template>
	<div class="meun" :class="{'showMeun':showm}">
		<div class="user_info" v-if="loginStatus" @click="gotoUserhome">
			<div class="avatar">
				<img :src="userInfo.avatar" alt="">
			</div>
			<div class="name">
				<p v-text="userInfo.loginname"></p>
			</div>
		</div>
		<div class="meun-list">
			<router-link class="item" to="/">首页</router-link>
			<router-link class="item" to="/login" v-if="!loginStatus">登录</router-link>
			<router-link class="item" to="/usermessage" v-if="loginStatus">未读消息<em v-if="messageCount !== 0" class="message-count">{{messageCount}}</em></router-link>
			<router-link class="item" to="/createtopic" v-if="loginStatus">发布话题</router-link>
			<router-link class="item" to="/about">关于</router-link>
			<a href="javascript:void(null);" class="item" v-if="loginStatus" @click="signOut">退出</a>
		</div>
	</div>
</template>
<script>
	export default {
		props : ['showm'],
		mounted : function() {
			if (localStorage.cnode_accesstoken) {
				// 存在本地游accesstoken记录，自动登录
				const userInfo = {
					'name' : localStorage.cnode_name,
					'avatar' : localStorage.cnode_avatar,
					'id' : localStorage.cnode_id,
					'accesstoken' : localStorage.cnode_accesstoken
				}
				this.$store.dispatch('isLogin');
				this.$store.dispatch('setUserInfo', userInfo);
			}
		},
		computed : {
			loginStatus() {
				return this.$store.getters.getLoginState;
			},
			messageCount() {
				return this.$store.getters.getNotMessageCount;
			},
			userInfo() {
				return this.$store.getters.getUserInfo;
			}
		},
		methods : {
			gotoUserhome : function() {
				this.$router.push({ name: 'userhome', params: { username: this.userInfo.loginname }});
			},
			signOut : function() {
				// 退出登录清除localStorage以及设置vuex的登录状态和用户信息
				localStorage.removeItem('cnode_name');
				localStorage.removeItem('cnode_avatar');
				localStorage.removeItem('cnode_id');
				localStorage.removeItem('cnode_accesstoken');
				const userInfo = {
					'name' : '',
					'avatar' : '',
					'id' : '',
					'accesstoken' : ''
				}
				this.$store.dispatch('signOut');
				this.$store.dispatch('setUserInfo', userInfo);
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
		.meun-list {
			padding: 20px 0;
			.item {
				position: relative;
				display: inline-block;
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