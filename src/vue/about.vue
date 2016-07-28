<template>
	<nv-header></nv-header>
	<div class="about">
		<img src="../img/old.jpg" alt="">
		<h2>cwsjoker</h2>
		<p>
			<a href="https://github.com/cwsjoker">github</a>
		</p>
		<p>
			<a href="https://segmentfault.com/u/cwsjoker/articles">segmentdefault</a>
		</p>
		<p>
			<a href="https://github.com/cwsjoker/Cnode-vue-spa">项目源码地址欢迎star</a>
		</p>
	</div>
</template>
<script>
	export default {
		ready : function(){

		},
		components : {
			'nv-header' : require('../components/header.vue')
		}
	}
</script>
<style lang="sass">
	.about {
		position: absolute;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		margin: auto;
		width: 100%;
		height: 200px;
		img {
			display: block;
			width: 100px;
			height: 100px;
			border-radius: 50px;
			margin: 0 auto;
		}
		h2 {
			width: 100%;
			height: 50px;
			font-size: 20px;
			text-align: center;
			line-height: 50px;
		}
		p {
			width: 100%;
			height: 30px;
			text-align: center;
			line-height: 30px;
		}
	}
</style>