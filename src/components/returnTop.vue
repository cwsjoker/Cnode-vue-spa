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
		ready : function() {
			$(window).on('scroll', () => {
				if($(window).scrollTop() > 150){
					this.showTop = true;
				}else{
					this.showTop = false;
				}	
			})
		},
		methods : {
			returnTop : function() {
				$(window).scrollTop(0);
				this.showTop = false;
			}
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