<template>
	<nv-header></nv-header>
	<div class="article">
		<div class="articlebox">
			<div class="articletitle">
				<h2>{{art.title}}</h2>
				<div>
					<span>发布于{{art.createtime | getLastTime}}</span>
					<span>作者{{art.author_name}}</span>
					<span>{{art.reply_count}}次回复</span>
					<span>{{art.visit_count}}次浏览</span>
				</div>
			</div>
			<div class="articlecontent" v-html="art.content"></div>
		</div>
		<div class="articlereplies">
			<div>共有<span>{{art.reply_count}}</span>条回复</div>
			<ul>
				<li v-for="reitem in replies">
					<div class="author_content clearfix">
						<img :src="reitem.author.avatar_url" :alt="reitem.author.loginname">
						<span>{{reitem.author.loginname}}</span>
						<span class="re-time">{{$index + 1}}楼{{reitem.create_at | getLastTime}}</span>
						<div class="replyhandle">
							<em class="upbtn" @click="upreply">赞{{reitem.ups.length}}</em>
							<em class="deletebtn" v-if="username === reitem.author.loginname" @click="deletereply">删</em>
							<em class="replybtn" @click="replythis(reitem.id)">回</em>
						</div>
					</div>
					<div class="repliescon">
						<div class="repliescontent" v-html="reitem.content"></div>
					</div>
					<re-ply :replycontent.sync="replies" :artid="articleId" :islogin="userLoginState" :replyid="reitem.id" :replythisid.sync="replythisid" :replyto="reitem.author.loginname" v-if="replythisid === reitem.id"></re-ply>
				</li>
			</ul>
		</div>
		<div class="recommentbox">
			<p>留下你的足迹:</p>
			<re-ply :replycontent.sync="replies" :artid="articleId" :islogin="userLoginState" :replyid=""></re-ply>
		</div>
	</div>
</template>
<script>
	import store from '../vuex/store';
	import nvHeader from '../components/header.vue';
	import rePly from '../components/reply.vue';
	import {getLoginState} from '../vuex/getters';
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
				replies : [],
				articleId : '',
				userid : localStorage.id || '',
				username : localStorage.name || '',
				accesstoken : localStorage.accesstoken || '',
				replythisid : ''
			}
		},
		route : {
			data (transition){
				this.articleId = transition.to.params.id;
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
                    	this.replies = D.replies;
                    }
                });
			}
		},
		methods : {
			replythis : function(id) {
				if(!this.userLoginState){
					// 未登陆，不能进行评论
					this.$route.router.go({name : 'login'});
					return;
				}
				this.replythisid = id;
			},
			deletereply : function() {
				// cnode暂时没有删除的api接口
			},
			upreply : function() {

			}
		},
		components : {
			'nv-header' : nvHeader,
			're-ply' : rePly
		},
		store : store,
		vuex : {
			getters : {
				userLoginState : getLoginState
			}
		}
	}
</script>
<style lang="sass">
	.article {
		overflow: hidden;
		margin: 10px 5px 0px;
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
				}
				> div {
					span {
						display: inlin-block;
						margin-right:10px;
						font-size: 12px;
    					color: #838383;
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
					line-height: 18px;
					.repliescontent {
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
			padding:10px;
			p {
				width : 100%;
				height : 25px;
				color : #08c;
				font-size : 15px;
			}
		}
	}
</style>