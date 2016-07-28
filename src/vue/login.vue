<template>
	<nv-header></nv-header>
	<div class="login-con">
		<h2>登录</h2>
		<div>
			<p>账号：</p>
			<p><input type="text"></p>
		</div>
		<div>
			<p>密码：</p>
			<p><input type="password"></p>
		</div>
		<div>
			<span>登录</span>
			<span>注册</span>
		</div>
	</div>
</template>
<script>
	export default {
		components : {
			'nv-header' : require('../components/header.vue')
		}
	}
</script>
<style lang="sass">
	.login-con {
		margin: 20px 5px 0;
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