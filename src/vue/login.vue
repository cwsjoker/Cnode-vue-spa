<template>
	<div>
		<nv-header></nv-header>
		<tips></tips>
		<div class="login-con">
			<h2>登录</h2>
			<div>
				<p>Token:</p>
				<p><input type="text" v-model="strToken" /></p>
			</div>
			<div>
				<span @click="login">登录</span>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import nvHeader from '../components/header.vue';
	import tips from '../components/tips.vue';
	export default {
		data : function(){
			return {
				strToken : ''
			}
		},
		methods : {
			login : function() {
				if (this.strToken.trim() === '') {
					this.$store.dispatch('setTipShow', true);
					this.$store.dispatch('setTipContent', 'accessToken不能为空！');
					return;
				}
				const rqdata = {
					'accesstoken' : this.strToken.trim()
				}
				axios.post('https://cnodejs.org/api/v1/accesstoken?accesstoken='+ this.strToken)
				.then((response_info) => {
					if (response_info.data.success) {
						const data = response_info.data;
						// 登入成功改变isLogin的状态为true
						this.$store.dispatch('isLogin');
						const userInfo = {
							'name' : data.loginname,
							'avatar' : data.avatar_url,
							'id' : data.id,
							'accesstoken' : this.strToken.trim()
						}
						this.$store.dispatch('setUserInfo', userInfo);
						// 登录成功记录账户信息存放至localStorage已备下次自动登录
						localStorage.setItem("cnode_accesstoken", userInfo.accesstoken);
						localStorage.setItem("cnode_avatar", userInfo.avatar);
						localStorage.setItem("cnode_id", userInfo.id);
						localStorage.setItem("cnode_name", userInfo.name);
						// 获取未读消息，并设置vuex
						axios.get('https://cnodejs.org/api/v1/message/count?accesstoken='+ this.strToken.trim())
						.then((response_count) => {
							if (response_count.data.success) {
								this.$store.dispatch('setNotMessageCount', response_count.data.data);
								window.history.back();
							}
						})
						.catch(function(error) {
							console.log(error);
						});
					}else{
						// 失败
					}
				})
				.catch((error) => {
					console.log(error);
					this.$store.dispatch('setTipShow', true);
					this.$store.dispatch('setTipContent', '错误的accessToken!');
				})		
			}
		},
		components : {
			nvHeader,
			tips
		}
	}
</script>
<style lang="sass">
	.login-con {
		margin: 20px 5px 0;
		padding-top : 3.5rem;
		background: #fff;
		border-radius: 7px;
		font-size: 14px;
		h2 {
			padding: 10px;
    		background-color: #f6f6f6;
    		border-radius: 3px 3px 0 0;
		}
		div {
			padding: 10px;
			p {
				padding: 5px 0px;
				input {
					width: 90%;
					height: 30px;
					padding: 5px 10px;
					border: 1px solid #ccc;
					border-radius: 5px;
				}
			}
			span {
				display: inline-block;
				padding: 5px;
				margin-right: 10px;
				background: #08c;
				color: #fff;
			}
		}
	}
</style>