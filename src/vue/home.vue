<template>
	<div>
		<h2>请等待</h2>
	</div>
</template>
<script>
	import nvHeader from '../components/header.vue';
	import articleList from '../vue/articleList.vue';
	export default {
		mounted : function() {
			setTimeout(() => {
				this.$router.push({
					name : 'articleList'
				});
			}, 2000);
		}
	}
</script>