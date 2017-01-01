<template>
	<div>
		<nv-header></nv-header>
		<topic-box :topicId="topicid"></topic-box>
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
			},
			// 获取主题id
			topicid() {
				return this.$route.params.topicid;
			}
		},
		components : {
			nvHeader,
			topicBox
		}
	}
</script>