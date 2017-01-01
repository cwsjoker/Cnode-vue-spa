<template>
	<div>
		<tips></tips>
		<div class="createtopic-box">
			<div class="createtopic-item">
				<select v-model="topicType">
					<option value="share">分享</option>
					<option value="ask">问答</option>
					<option value="jpb">招聘</option>
				</select>
			</div>
			<div class="createtopic-item">
				<input v-model="topicTitle" type="text" placeholder="在此输入话题标题">
			</div>
			<div class="createtopic-item">
				<textarea v-model="topicContainer" placeholder="在此输入话题内容"></textarea>
				<div>
					<span class="submit" @click="submitTopic">提交</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import tips from '../components/tips.vue';
	export default {
		props : ['topicId'],
		data : function() {
			return {
				topicType : 'share',
				topicTitle : '',
				topicContainer : ''
			}
		},
		mounted : function() {
			if (this.topicId) {
				// 修改主题
				const rqdata = {
					mdrender : false
				}
				axios.get('https://cnodejs.org/api/v1/topic/'+this.topicId, {
					params : rqdata
				})
				.then((response) => {
					const data = response.data;
					if (data.success) {
						this.topicType = data.data.tab;
						this.topicTitle = data.data.title;
						this.topicContainer = data.data.content;
					}
				})
				.catch(function(error) {
					console.log(error);
				})
			}
		},
		methods : {
			submitTopic : function() {
				if (this.LoginState) {
					const title = this.topicTitle.trim(),
						  content = this.topicContainer.trim();
					if (title.length <= 10 || content === '') {
						this.$store.dispatch('setTipShow', true);
						this.$store.dispatch('setTipContent','标题字少10个字以上或内容不能为空。');
						return;
					}
					let url = '';
					if (this.topicId) {
						// 修改
						url = 'https://cnodejs.org/api/v1/topics/update';
					} else {
						// 创建
						url = 'https://cnodejs.org/api/v1/topics';
					}
					axios.post(url, {
						'accesstoken' : this.userInfo.accesstoken,
						'title' : title,
						'tab' : this.topicType,
						'content' : content,
						'topic_id' : this.topicId
					})
					.then((response) => {
						const data = response.data;
						if(data.success) {
							this.$router.push({name : 'article',params:{id:data.topic_id}});
						}
					})
					.catch(function(error) {
						console.log(error);
					})
				} else {
					this.$router.push({name : 'login'});
				}
			}
		},
		computed : {
			// 登陆状态
			LoginState() {
				return this.$store.getters.getLoginState;
			},
			// 登陆用户信息
			userInfo() {
				return this.$store.getters.getUserInfo;
			}
		},
		components : {
			tips
		}
	}
</script>
<style lang="sass">
	.createtopic-box {
		overflow: hidden;
    	margin: 0 5px;
    	padding-top: 4rem;
    	.createtopic-item {
    		width: 90%;
    		height: auto;
    		padding: 15px 5%;
    		select {
    			width: 30%;;
    			height: 1.5rem;
    			padding-left: 20px;
    			font-size: 0.8rem;
    		}
    		input {
    			width: 100%;
    			height: 1.5rem;
    			font-size: 0.8rem;
    		}
    		textarea {
    			width: 100%;
    			height: 6rem;
    			font-size: 0.8rem;
    		}
    		.submit {
				display:inline-block;
				width: 10%;
				height: 1.5rem;
				background-color: #0088CC;
				color: #fff;
				font-size: 0.8rem;
				text-align: center;
				line-height: 1.5rem;
			}
    	}
	}
</style>