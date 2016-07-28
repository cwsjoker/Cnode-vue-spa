<template>
	<div>
		<div class="con" @click="golist">
			<div class="conbox" :class="{'con-on' : showlist}" v-text:="showtext"></div>
			<div class="top" :class="{'top-on' : showlist}"></div>
			<div class="bottom" :class="{'bottom-on' : showlist}"></div>
			<div class="left" :class="{'left-on' : showlist}"></div>
			<div class="right" :class="{'right-on' : showlist}"></div>
		</div>
	</div>
</template>
<script>
	export default {
		data : function() {
			return {
				showlist : false,
				showtext : 'go'
			}
		},
		ready : function() {
			
		},
		methods : {
			golist : function() {
				this.showlist = true;
				this.showtext = '';
				setTimeout(() => {
					this.$route.router.go({name : 'artlist'});
				}, 1200);
			}
		}
	}
</script>
<style lang="sass">
	.con {
		position: absolute;
		width: 200px;
		height: 200px;
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;
		margin: auto;
		cursor: pointer;
		.conbox {
			position: absolute;
			width: 200px;
			height: 200px;
			top: 0px;
			left: 0px;
			bottom: 0px;
			right: 0px;
			margin: auto;
			background: #fff;
			color: #00CC96;
			font-size: 50px;
			line-height: 200px;
			text-align: center;
			border-radius: 50%;
			-webkit-transition: transform 0.8s 0.2s, background 0.2s 0.8s;
		}
		.top {
			position: absolute;
			width: 200px;
			height: 200px;
			top: 0px;
			left: 0px;
			border-top: 1px solid #00CC96;
			border-left: 0px solid #00CC96;
			border-radius: 50%;
			z-index: 5;
			-webkit-transition: width 1s, height 1s, border-left 1s, border-top 1s;
		}
		.bottom {
			position: absolute;
			width: 200px;
			height: 200px;
			bottom: 0px;
			right: 0px;
			border-bottom: 1px solid #00CC96;
			border-right: 0px solid #00CC96;
			border-radius: 50%;
			z-index: 5;
			-webkit-transition: width 1s, height 1s, border-right 1s, border-bottom 1s;
		}
		.left {
			position: absolute;
			width: 200px;
			height: 200px;
			bottom: 0px;
			left: 0px;
			border-bottom: 0px solid #00CC96;
			border-left: 1px solid #00CC96;
			border-radius: 50%;
			z-index: 5;
			-webkit-transition: height 1s, width 1s, border-bottom 1s, border-left 1s;
		}
		.right {
			position: absolute;
			width: 200px;
			height: 200px;
			top: 0px;
			right: 0px;
			border-top: 0px solid #00CC96;
			border-right: 1px solid #00CC96;
			border-radius: 50%;
			z-index: 5;
			-webkit-transition: height 1s, width 1s, border-top 1s, border-right 1s;
		}
		.con-on {
			-webkit-transform : scale(0.1,0.1);
			background: #00CC96;
		}
		.top-on {
			border-top: 5px solid #00CC96;
			border-left: 5px solid #00CC96;
			width: 95px;
			height: 95px;
		}
		.bottom-on {
			border-bottom: 5px solid #00CC96;
			border-right: 5px solid #00CC96;
			width: 95px;
			height: 95px;
		}
		.left-on {
			border-bottom: 5px solid #00CC96;
			border-left: 5px solid #00CC96;
			width: 95px;
			height: 95px;
		}
		.right-on {
			border-top: 5px solid #00CC96;
			border-right: 5px solid #00CC96;
			width: 95px;
			height: 95px;
		}
	}
</style>