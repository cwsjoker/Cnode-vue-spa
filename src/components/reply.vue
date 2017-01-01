<template>
	<div class="reply-box">
		<div class="textinp">
			<textarea ref="textarea" v-model="repliescontent" placeholder="请输入留言"></textarea>
		</div>
		<div class="textsub">
			<span class="rebtn" @click="recomment">回复</span>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	export default {
		// 本页面的评论， 回复文章id， 回复某条评论的id， 该评论id，回复某条评论的所有者
		props : ['replycontent', 'artid', 'replyid', 'replythisid', 'replyto'],
		data : function() {
			return {
				repliescontent : '',
				last_text : '<br/><br/>&lt;a href=https://github.com/cwsjoker/Cnode-vue-spa">来自炫酷吊炸天 Cnode</a>'
			}
		},
		mounted : function() {
			if (this.replyid) {
				this.repliescontent = '@' + this.replyto + ' ';
			}
			this.$refs.textarea.focus();
		},
		computed: {
			// 登陆状态
			LoginState() {
				return this.$store.getters.getLoginState;
			},
			// 登陆用户信息
			userInfo() {
				return this.$store.getters.getUserInfo;
			}
		},
		methods : {
			recomment : function() {
				// 判断是否登录，如果为登录去登录页面
				if (this.LoginState) {
					// 判断内容是否为空
					if (this.repliescontent !== '') {
						// 回复内容不为空
						// const arr = window.location.href.split('/');
						let id = '';
						this.replyid ? id = this.replyid : id = '';
						axios.post('https://cnodejs.org/api/v1/topic/'+ this.artid +'/replies', {
							accesstoken : this.userInfo.accesstoken,
							content : this.repliescontent + this.last_text,
							replies : id
						})
						.then((response) => {
							if (response.data.success) {
								// 评论成功
								const time = new Date();
								axios.get('https://cnodejs.org/api/v1/topic/'+this.artid)
								.then((response_reply) => {
									if(response_reply.data.success) {
										const D = response_reply.data.data;
										this.$store.dispatch('setReplies', D.replies);
										this.repliescontent = '';
										if(this.replythisid) {
											this.$emit('recomment');
										}
									}
								})
								.catch(function(error) {
									console.log(error);
								})
							} else {
								// 提交评论失败
							}
						})
						.catch(function(error) {
							console.log(error);
						})
					} else {
						// 内容为空
						this.$store.dispatch('setTipShow', true);
						this.$store.dispatch('setTipContent', '回复内容不能为空！');
					}
				} else {
					this.$router.push({name : 'login'});
				}
			}
		}
	}
</script>
<style lang="sass">
	.reply-box {
		padding: 0.5rem 0;
		.textinp {
			position: relative;
			margin-left: 5%;
			height: 3.6rem;
			textarea {
				position: absolute;
				left:0;
				bottom: 0;
				width : 85%;
				height : 2.8rem;
				padding : 0.2rem;
				font-size : 0.8rem;
				outline : none;
				resize : none;
			}
		}
		.textsub {
			margin-left: 5%;
			.rebtn {
				display : inline-block;
				margin : 5px 0 0 0;
				color : #fff;
				padding : 5px 10px;
				font-size : 15px;
				border-radius: 3px;
				background-color: #08c
			}
		}
	}
</style>