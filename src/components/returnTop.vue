<template>
	<div class="return-top" v-show="showTop" v-on:click="returnTop"></div>
</template>
<script>
	export default {
		data : function() {
			return {
				showTop : false
			}
		},
		mounted : function() {
			window.addEventListener('scroll', this.scrollEvent, false);
		},
		methods : {
			returnTop : function() {
				window.scroll(0, 0);
				this.showTop = false;
			},
			scrollEvent : function () {
				if (parseFloat(window.scrollY) > 150) {
					this.showTop = true;
				} else {
					this.showTop = false;
				}
			}
		},
		beforeDestroy : function() {
			window.removeEventListener('scroll', this.scrollEvent, false);
		}
	}
</script>
<style lang="sass">
	.return-top {
		position: fixed;
		width: 50px;
		height: 50px;
		right: 15px;
		bottom: 3rem;
		background: #e1e1e1 url('../img/returnTop.png') no-repeat;
		border-radius: 25px;
		z-index: 9;
	}
</style>