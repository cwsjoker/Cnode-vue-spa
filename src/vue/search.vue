<template>
	<nv-header></nv-header>
	<p>还未开发</p>
	<p>敬请期待</p>
</template>
<script>
	import store from '../vuex/store';
	import nvHeader from '../components/header.vue';
	export default {
		components : {
			'nv-header' : nvHeader
		},
		store : store
	}
</script>
<style lang="sass">
	p {
		width: 100%;
		text-align: center;
	}
</style>