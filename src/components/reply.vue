<template>
	<textarea v-el:textarea v-model="repliescontent" placeholder="请输入留言"></textarea>
	<span class="rebtn" @click="recomment">回复</span>
</template>
<script>
	import {setTipShow, setTipContent} from '../vuex/actions';
	import {getUserInfo} from '../vuex/getters';
	export default {
		props : ['replycontent', 'artid', 'islogin', 'replyid', 'replythisid', 'replyto'],
		data : function() {
			return {
				repliescontent : '',
				accesstoken : this.getUserInfo.accesstoken
			}
		},
		ready : function() {
			console.log(this.replythisid);
			console.log(this.replyto);
			if(this.replythisid){
				this.repliescontent = '@' + this.replyto + ' ';
			}
			this.$els.textarea.focus();
		},
		methods : {
			recomment : function() {
				// 判断是否登录，如果为登录去登录页面
				console.log(this.replycontent);
				console.log(this.artid);
				console.log(this.islogin);
				console.log(this.replyid);
				if(this.islogin){
					// 判断内容是否为空
					if(this.repliescontent !== ''){
						// 回复内容不为空
						// const arr = window.location.href.split('/');
						const time = new Date();
						const url = 'https://cnodejs.org/api/v1/topic/'+ this.artid +'/replies';
						const rqdata = {
								'accesstoken' : this.accesstoken,
								'content' : this.repliescontent,
								'replies' : this.replyid
						}
						$.post(url, rqdata, (data) => {
							if(data){
								// 评论成功
								this.replycontent.push({
									'author' : {
										'avatar_url' : localStorage.avatar,
										'loginname' : localStorage.name
									},
									'content' : this.repliescontent,
									'create_at' : time,
									'id' : localStorage.id,
									'reply_id' : this.replyid,
									'ups' : []
								})
								this.repliescontent = '';
								if(this.replythisid){
									this.replythisid = '';
								}
							}else{
								// 提交评论失败
							}
						})
					}else{
						// 内容为空
						this.tipShow(true);
						this.tipContent('回复内容不能为空。');
					}
				}else{
					this.$route.router.go({name : 'login'});
				}
			}
		},
		vuex : {
			actions : {
				tipShow : setTipShow,
				tipContent : setTipContent
			},
			getters : {
				getUserInfo : getUserInfo
			}
		}
	}
</script>
<style lang="sass">
	textarea {
		width : 85%;
		height : 80px;
		padding : 10px;
		outline : none;
		resize : none;
	}
	.rebtn {
		display : inline-block;
		margin-top : 5px;
		color : #fff;
		padding : 5px 10px;
		font-size : 15px;
		border-radius: 3px;
		background-color: #08c
	}
</style>