<template>
	<div>
		<nv-header></nv-header>
		<topic-box></topic-box>
	</div>
</template>
<script>
	import nvHeader from '../components/header.vue';
	import topicBox from '../components/topicbox.vue';
	export default {
		mounted : function() {
			if (!this.LoginState) {
				// 未登陆，跳转登陆页
				this.$router.push({name : 'login'});
				return;
			}
		},
		computed : {
			// 登陆状态
			LoginState() {
				return this.$store.getters.getLoginState;
			}
		},
		components : {
			nvHeader,
			topicBox
		}
	}
</script>