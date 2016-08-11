<template>
	<nv-header></nv-header>
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
</template>
<script>
	import store from '../vuex/store';
	import nvHeader from '../components/header.vue';
	import {isLogin} from '../vuex/actions';
	import {getLoginState} from '../vuex/getters';
	export default {
		data : function(){
			return {
				strToken : ''
			}
		},
		methods : {
			login : function() {
				console.log(this.userLoginState);
				let rqdata = {
					'accesstoken' : this.strToken
				}

				$.post('https://cnodejs.org/api/v1/accesstoken', rqdata, (data) => {
					if(data){
						// 登入成功改变isLogin的状态为true
						this.userLogin();
						localStorage.name = data.loginname;
						localStorage.avatar = data.avatar_url;
						localStorage.id = data.id;
						window.history.back();
					}else{
						// 失败
					}
				})
			}
		},
		components : {
			'nv-header' : nvHeader
		},
		store : store,
		vuex : {
			actions : {
				userLogin : isLogin
			},
			getters : {
				userLoginState : getLoginState
			}
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