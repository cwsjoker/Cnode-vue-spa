<template>
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
</template>
<script>
	import tips from '../components/tips.vue';
	import {setTipShow, setTipContent} from '../vuex/actions';
	import {getLoginState, getUserInfo} from '../vuex/getters';
	export default {
		props : ['accesstoken', 'topicId'],
		data : function() {
			return {
				topicType : 'share',
				topicTitle : '',
				topicContainer : ''
			}
		},
		watch : {
			topicId : function() {
				// 修改主题
				const rqdata = {
					mdrender : false
				}
				$.get('https://cnodejs.org/api/v1/topic/'+this.topicId, rqdata, (data) => {
					if(data.success) {
						this.topicType = data.data.tab;
						this.topicTitle = data.data.title;
						this.topicContainer = data.data.content;
					}
				})
			}
		},
		methods : {
			submitTopic : function() {
				const title = this.topicTitle.trim(),
					  content = this.topicContainer.trim();
				if(title.length <= 10 || content === '') {
					this.hand_tipShow(true);
					this.hand_tipContent('标题字少10个字以上或内容不能为空。');
					return;
				}
				let url = '',
					rqdata = '';
				if(this.topicId) {
					// 修改
					url = 'https://cnodejs.org/api/v1/topics/update';
					rqdata = {
						'accesstoken' : this.accesstoken,
						'title' : title,
						'tab' : this.topicType,
						'content' : content,
						'topic_id' : this.topicId
					};
				}else{
					// 创建
					url = 'https://cnodejs.org/api/v1/topics';
					rqdata = {
						'accesstoken' : this.accesstoken,
						'title' : title,
						'tab' : this.topicType,
						'content' : content
					};
				}
				$.post(url, rqdata, (data) => {
					if(data.success) {
						this.$route.router.go({name : 'article',params:{id:data.topic_id}});
					}
				})
			}
		},
		components : {
			'tips' : tips
		},
		vuex : {
			actions : {
				hand_tipShow : setTipShow,
				hand_tipContent : setTipContent
			},
			getters : {
				ache_userLoginState : getLoginState,
				ache_getUserInfo :  getUserInfo
			}
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