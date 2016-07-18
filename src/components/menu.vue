<template>
	<div class="meun" :class="{'showMeun':showm}">
		<ul>
			<li v-link="{name:'home'}">首页</li>
			<li v-link="{name : 'search'}">搜索</li>
			<li v-link="{name : 'login'}">登录</li>
			<li v-link="{name : 'login'}">注册</li>
			<li v-link="{name : 'about'}">关于</li>
		</ul>
	</div>
</template>
<script>
	export default {
		props : ['showm']
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
		ul {
			padding-top: 3rem;
			li {
			    color: #fff;
			    padding: 16px 0;
			    text-align: left;
			    text-indent: 10px;
			    line-height: 20px;
			    font-size: 20px;
			    margin: 0 25px;
			}
		}
	}
	.showMeun {
		transform: translateX(200px);
	}
</style>