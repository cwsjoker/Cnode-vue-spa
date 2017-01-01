<template>
	<div>
		<div class="page-cover"  v-show="coverShow" v-on:click="hideMenu"></div>
		<div class="header">
			<span class="left-menu" v-on:click="showMenu"></span>cnode.js
		</div>
		<nv-menu :showm="menuShow"></nv-menu>
	</div>
</template>
<script>
	import nvMenu from './menu.vue';
	export default {
		data : function() {
			return {
				coverShow : false,
				menuShow : false
			}
		},
		methods : {
			showMenu : function() {
				this.coverShow = true;
				this.menuShow = true;
			},
			hideMenu : function() {
				this.coverShow = false;
				this.menuShow = false;
			}

		},
		components : {
            nvMenu
        }
	}
</script>
<style lang="sass">
	.page-cover {
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
		z-index: 98;
	}
	.header {
		position: fixed;
		top : 0px;
		width: 100%;
		height: 3rem;
		top: 0px;
		left: 0px;
		margin-bottom: 1rem;
		background: #fff;
		border: 1px solid #e1e1e1;
		text-align: center;
		line-height: 3rem;
		z-index: 10;
		.left-menu {
			position: absolute;
			width: 2rem;
			height: 2rem;
			top: 0.5rem;
			left: 0.5rem;
			background: url('../img/nav.png') no-repeat;
			background-size: 2rem;
		}
	}
</style>