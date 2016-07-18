<template>
	<div>
		<img class="loading" src="../img/loading.gif" alt="">
	</div>
</template>
<script>
	export default {
		ready : function() {
			setTimeout(() => {
				this.$route.router.go({name : 'artlist'});
			}, 2000);
		}
	}
</script>
<style lang="sass">
	.loading {
		position: absolute;
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;
		margin: auto;
		width: 41.67%;
		height: 10.42rem;
	}
</style>