<template>
	<div>
		<nv-header></nv-header>
		<tips></tips>
		<div class="article">
			<div class="articlebox">
				<div class="articletitle">
					<h2>{{art.title}}<span class="collection" :class="{'on-collection' : conllection.is}" @click="collect" >{{conllection.title}}</span></h2>
					<div>
						<span>发布于{{art.createtime | getLastTime}}</span>
						<span>作者{{art.author_name}}</span>
						<span>{{art.reply_count}}次回复</span>
						<span>{{art.visit_count}}次浏览</span>
						<span class="edit" v-if="LoginState && userInfo.loginname === art.author_name" @click="editTopic">编辑</span>
					</div>
				</div>
				<div class="articlecontent" v-html="art.content"></div>
			</div>
			<div class="articlereplies">
				<div>共有<span>{{art.reply_count}}</span>条回复</div>
				<ul>
					<li v-for="(reitem, index) in replies">
						<div class="author_content clearfix">
							<router-link :to="{name:'userhome',params:{username:reitem.author.loginname}}">
								<img :src="reitem.author.avatar_url" :alt="reitem.author.loginname">
							</router-link>
							<span>{{reitem.author.loginname}}</span>
							<span class="re-time">{{index + 1}}楼{{reitem.create_at | getLastTime}}</span>
							<div class="replyhandle">
								<em class="upbtn" :class="{'isupbtn' : reitem.isup}" @click="upreply(index, reitem.id, reitem.author.loginname)">赞{{reitem.ups.length}}</em>
								<em class="deletebtn" v-if="userInfo.loginname === reitem.author.loginname" @click="deletereply(reitem.id)">删</em>
								<em class="replybtn" @click="replythis(reitem.id)">回</em>
							</div>
						</div>
						<div class="repliescon">
							<div class="repliescontent" v-html="reitem.content"></div>
						</div>
						<re-ply :replycontent="replies" :artid="article_Id" :replyid="reitem.id" :replythisid="replythisid" :replyto="reitem.author.loginname" v-if="replythisid === reitem.id" v-on:recomment="recommentClearId"></re-ply>
					</li>
				</ul>
			</div>
			<div class="recommentbox">
				<p>留下你的足迹:</p>
				<re-ply :replycontent="replies" :artid="article_Id"></re-ply>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import nvHeader from '../components/header.vue';
	import tips from '../components/tips.vue';
	import rePly from '../components/reply.vue';
	export default {
		data : function() {
			return {
				art : {
					'title' : '',
					'content' : '',
					'createtime' : '',
					'author_name' : '',
					'author_avatar' : '',
					'visit_count' : 0,
					'reply_count' : 0
				},
				conllection : {
					'is' : false,
					'title' : '收藏'
				},
				replythisid : ''
			}
		},
		mounted : function() {
				const artid = this.$route.params.id;
				// 获取文章详情
				axios.get('https://cnodejs.org/api/v1/topic/'+artid)
				.then((response) => {
                    if (response.data.success) {
                    	var D = response.data.data;
                    	this.art.title = D.title;
                    	this.art.content = D.content;
                    	this.art.createtime = D.create_at;
                    	this.art.author_name = D.author.loginname;
                    	this.art.author_avatar = D.author.avatar_url;
                    	this.art.visit_count = D.visit_count;
                    	this.art.reply_count = D.reply_count;
                    	// 给每一条评论添加一个不点亮的赞效果，添加完属性在赋值
                    	for (const replies of D.replies) {
                    		replies.isup = false;
                    	};
                    	this.replies = this.$store.dispatch('setReplies', D.replies);
                    	// 判断本条回复是否自己已点赞
                    	if (this.LoginState) {
                    		// 循环评论
	                    	for (const repliesItem of this.replies) {
	                    		// 循环评论的回复
	                    		for (const repliesItemUps of repliesItem.ups) {
	                    			if (repliesItemUps === this.userInfo.id) {
	                    				// console.log('已赞');
	                    				repliesItem.isup = true;
	                    				break;
	                    			}
	                    		}
	                    	}
                    	}
                    }
				})
				.catch(function(error) {
					console.log(error);
				})
				// 更改收藏状态
				if (this.LoginState) {
					// 登录状态，判断是否收藏本文章
					axios.get('https://cnodejs.org/api/v1/topic_collect/' + this.userInfo.loginname)
					.then((response) => {
						if (response.data.success) {
							const d = response.data;
							for (const i of d.data) {
								if (artid === i.id) {
									console.log('用户已收藏文章');
									this.conllection.is = true;
									this.conllection.title = '取消收藏';
									break;
								}
							}
						}
					})
					.catch(function(error) {
						console.log(error);
					})
				}
				// 主题加载完成自动返回顶部
				window.scroll(0, 0);
		},
		computed : {
			// 登陆状态
			LoginState() {
				return this.$store.getters.getLoginState;
			},
			// 登陆用户信息
			userInfo() {
				return this.$store.getters.getUserInfo;
			},
			// 获取文章评论
			replies() {
				return this.$store.getters.getReplies;
			},
			// 获取文章id
			article_Id() {
				return this.$route.params.id;
			}
		},
		methods : {
			// 收藏
			collect : function() {
				if (!this.LoginState) {
					// 未登陆不能进行主题收藏
					this.$store.dispatch('setTipShow', true);
					this.$store.dispatch('setTipContent', '您还未登录，不能进行收藏！');
					return;
				}
				if (this.conllection.is) {
					// 已收藏，进行取消收藏操作
					axios.post('https://cnodejs.org/api/v1/topic_collect/de_collect', {
						accesstoken : this.userInfo.accesstoken,
						topic_id : this.article_Id
					})
					.then((response) => {
						if(response.data.success) {
							this.conllection.is = false;
							this.conllection.title = '收藏';
						}
					})
					.catch(function(error) {
						console.log(error);
					});
				} else {
					// 未收藏，进行收藏操作
					axios.post('https://cnodejs.org/api/v1/topic_collect/collect', {
						accesstoken : this.userInfo.accesstoken,
						topic_id : this.article_Id
					})
					.then((response) => {
						if(response.data.success) {
							this.conllection.is = true;
							this.conllection.title = '取消收藏';
						}
					})
					.catch(function(error) {
						console.log(error);
					});
				}
			},
			// 编辑文章
			editTopic : function() {
				this.$router.push({name : 'edittopic',params : {topicid : this.article_Id}});
			},
			// 是否能评论
			replythis : function(id) {
				if (!this.LoginState) {
					// 未登陆，不能进行评论,直接去登录页面
					this.$router.push({name : 'login'});
					return;
				}
				this.replythisid = id;
			},
			deletereply : function(id) {
				cnode暂时没有删除的api接口
				this.$store.dispatch('setTipShow', true);
				this.$store.dispatch('setTipContent', '暂时不支持删除评论功能！');
				return;
			},
			// 点赞
			upreply : function(index, replieId, loginname) {
				if (!this.LoginState) {
					// 用户还没有登录，不能进行点赞功能
					this.$store.dispatch('setTipShow', true);
					this.$store.dispatch('setTipContent', '您还未登录，不能进行点赞！');
					return;
				}
				if (loginname === this.userInfo.loginname) {
					// 不能为自己的评论进行点赞功能
					this.$store.dispatch('setTipShow', true);
					this.$store.dispatch('setTipContent', '不能为自己点赞！');
					return;
				}
				axios.post('https://cnodejs.org/api/v1/reply/'+replieId+'/ups', {
					accesstoken : this.userInfo.accesstoken
				})
				.then((response) => {
					if (response.data.success) {
						const data = response.data;
						if (data.action === 'up') {
							// 点赞
							this.replies[index].ups.push('');
							this.replies[index].isup = true;
						} else {
							// 取消点赞
							this.replies[index].ups.pop('');
							this.replies[index].isup = false;
						}
					}
				})
				.catch(function(error) {
					console.log(error);
				})
			},
			recommentClearId : function() {
				this.replythisid = '';
			}
		},
		components : {
			nvHeader,
			rePly,
			tips
		}
	}
</script>
<style lang="sass">
	.article {
		overflow: hidden;
		margin: 3rem 5px 0px;
		> div {
			margin-top:10px;
			background: #fff;
			border-radius: 7px;
		}
		.articlebox {
			padding:10px;
			.articletitle {
				h2 {
					font-size: 20px;
					span {
						display : inline-block;
						margin-left: 10px;
						padding: 3px 5px;
						background : #80bd01;
						color : #000;
						font-size : 12px;
						border-radius: 2px;
					}
					.on-collection {
						background : #909090;
						color : #fff;
					}
				}
				> div {
					span {
						display: inlin-block;
						margin-right:10px;
						font-size: 12px;
    					color: #838383;
					}
					.edit {
						width: 40px;
						padding: 3px 5px;
						background : #80bd01;
						color : #000;
						font-size : 12px;
						border-radius: 2px;
					}
				}
			}
			.articlecontent {
				margin-top:10px;
				font-size:15px;
				line-height:23px;
				img {
					width: 20rem;
				}
			}
		}
		.articlereplies {
			width: 100%;
			margin-bottom: 20px;
			> div {
				width: 100%;
				padding: 10px;
			}
			li {
				padding: 10px;
				border-top: 1px solid #f0f0f0;
				.author_content {
					position: relative;
					img, span {
						float:left;
						display:inline-block;
					}
					span {
						margin-left: 10px;
						line-height: 2rem;
					}
					img {
						width: 30px;
						height: 30px;
					}
					.re-time {
						color: #08c;
					}
					.replyhandle {
						position : absolute;
						right: 0px;
						top : 0px;
						em {
							padding : 3px;
							color : #fff;
							border-radius : 2px;
						}
						.upbtn {
							background : #A1AFC9;
						}
						.isupbtn {
							background : #159F5C;
						}
						.deletebtn {
							background : #DD4F43;
						}
						.replybtn {
							background : #FFCE42;
						}
					}
				}
				.repliescon {
					margin-top: 10px;
					.repliescontent {
						overflow: scroll;
						background: #f0f0f0;
						padding: 5px 2px;
						border-radius: 5px;
					}
				}
			}
		}
		.recommentbox {
			width: 100%;
			margin-bottom: 20px;
			padding-top: 0.3rem;
			p {
				width : 100%;
				height : 1rem;
				margin-left: 5%;
				color : #08c;
				font-size : 0.8rem;
				line-height : 1rem;
			}
		}
	}
</style>