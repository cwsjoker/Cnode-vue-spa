<template>
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
					<span class="edit" v-if="ache_userLoginState && username === art.author_name" @click="editTopic">编辑</span>
				</div>
			</div>
			<div class="articlecontent" v-html="art.content"></div>
		</div>
		<div class="articlereplies">
			<div>共有<span>{{art.reply_count}}</span>条回复</div>
			<ul>
				<li v-for="reitem in replies">
					<div class="author_content clearfix">
						<img :src="reitem.author.avatar_url" :alt="reitem.author.loginname" v-link="{name:'userhome',params:{username:reitem.author.loginname}}">
						<span>{{reitem.author.loginname}}</span>
						<span class="re-time">{{$index + 1}}楼{{reitem.create_at | getLastTime}}</span>
						<div class="replyhandle">
							<em class="upbtn" :class="{'isupbtn' : reitem.isup}" @click="upreply($index, reitem.id, reitem.author.loginname)">赞{{reitem.ups.length}}</em>
							<em class="deletebtn" v-if="username === reitem.author.loginname" @click="deletereply">删</em>
							<em class="replybtn" @click="replythis(reitem.id)">回</em>
						</div>
					</div>
					<div class="repliescon">
						<div class="repliescontent" v-html="reitem.content"></div>
					</div>
					<re-ply :replycontent.sync="replies" :artid="articleId" :islogin="ache_userLoginState" :replyid="reitem.id" :replythisid.sync="replythisid" :replyto="reitem.author.loginname" v-if="replythisid === reitem.id"></re-ply>
				</li>
			</ul>
		</div>
		<div class="recommentbox">
			<p>留下你的足迹:</p>
			<re-ply :replycontent.sync="replies" :artid="articleId" :islogin="ache_userLoginState" :replyid=""></re-ply>
		</div>
	</div>
</template>
<script>
	import store from '../vuex/store';
	import nvHeader from '../components/header.vue';
	import tips from '../components/tips.vue';
	import rePly from '../components/reply.vue';
	import {setTipShow, setTipContent} from '../vuex/actions';
	import {getLoginState, getUserInfo} from '../vuex/getters';
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
				replies : [],
				articleId : '',
				userid : this.ache_getUserInfo.id || '',
				username : this.ache_getUserInfo.loginname || '',
				accesstoken : this.ache_getUserInfo.accesstoken || '',
				replythisid : ''
			}
		},
		route : {
			data (transition){
				this.articleId = transition.to.params.id;
				// 获取文章详情
				$.get('https://cnodejs.org/api/v1/topic/'+this.articleId,(d) => {
                    if(d && d.data){
                    	var D = d.data;
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
                    	this.replies = D.replies;
                    	// 判断本条回复是否自己已点赞
                    	if(this.userid != ''){
                    		// 循环评论
	                    	for (const repliesItem of this.replies) {
	                    		// 循环评论的回复
	                    		for (const repliesItemUps of repliesItem.ups) {
	                    			if(repliesItemUps === this.userid){
	                    				console.log('已赞');
	                    				repliesItem.isup = true;
	                    				break;
	                    			}
	                    		};
	                    	};
	                    	console.log(this.replies);
                    	}
                    }
                })
				// 更改收藏状态
				if(this.ache_userLoginState) {
					// 登录状态，判断是否收藏本文章
					$.get('https://cnodejs.org/api/v1/topic_collect/' + this.username, (d) => {
						if(d.success) {
							for (const i of d.data) {
								if (this.articleId === i.id) {
									console.log('用户已收藏文章');
									this.conllection.is = true;
									this.conllection.title = '取消收藏';
									break;
								}
								
							}
						}
					})
				} 
			}
		},
		methods : {
			// 收藏
			collect : function() {
				if(!this.ache_userLoginState) {
					// 未登陆不能进行主题收藏
					this.hand_tipShow(true);
					this.hand_tipContent('您还未登录，不能进行收藏！');
					return;
				}
				const rqdata = {
					'accesstoken' : this.accesstoken,
					'topic_id' : this.articleId
				}
				if(this.conllection.is) {
					// 已收藏，进行取消收藏操作
					$.post('https://cnodejs.org/api/v1/topic_collect/de_collect', rqdata, (d) => {
						if(d.success) {
							this.conllection.is = false;
							this.conllection.title = '收藏';
						}
					})
				}else {
					// 未收藏，进行收藏操作
					$.post('https://cnodejs.org/api/v1/topic_collect/collect', rqdata, (d) => {
						if(d.success) {
							this.conllection.is = true;
							this.conllection.title = '取消收藏';
						}
					})
				}
			},
			// 编辑文章
			editTopic : function() {
				this.$route.router.go({name : 'edittopic',params:{id:this.articleId}});
			},
			// 是否能评论
			replythis : function(id) {
				if(!this.ache_userLoginState){
					// 未登陆，不能进行评论,直接去登录页面
					this.$route.router.go({name : 'login'});
					return;
				}
				this.replythisid = id;
			},
			deletereply : function() {
				// cnode暂时没有删除的api接口
				this.hand_tipShow(true);
				this.hand_tipContent('暂时不支持删除评论功能！');
				return;
			},
			// 点赞
			upreply : function(index, replieId, loginname) {
				if(!this.ache_userLoginState){
					// 用户还没有登录，不能进行点赞功能
					this.hand_tipShow(true);
					this.hand_tipContent('您还未登录，不能进行点赞！');
					return;
				}
				if(loginname === this.username) {
					// 不能为自己的评论进行点赞功能
					this.hand_tipShow(true);
					this.hand_tipContent('不能为自己点赞！');
					return;
				}
				const rqdata = {
					'accesstoken' : this.accesstoken
				}
				$.post('https://cnodejs.org/api/v1/reply/'+replieId+'/ups', rqdata, (data) => {
					if(data.success){
						console.log(data);
						if(data.action === 'up'){
							// 点赞
							this.replies[index].ups.push('');
							this.replies[index].isup = true;
							console.log(this.replies[index]);
						}else{
							// 取消点赞
							this.replies[index].ups.pop('');
							this.replies[index].isup = false;
							console.log(this.replies[index]);
						}
					}
				})
			}
		},
		components : {
			'nv-header' : nvHeader,
			're-ply' : rePly,
			'tips' : tips
		},
		store : store,
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