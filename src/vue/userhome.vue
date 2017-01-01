<template>
	<div>
		<nv-header></nv-header>
		<div class="userhome">
			<!-- 头像，个人基本信息 -->
			<div class="userInfo">
				<div class="userInfoTitle">个人信息</div>
				<div class="userInfoBox">
					<div class="useravatar">
						<img :src="user_avatar">
					</div>
					<div class="userbase">
						<p class="name">{{user_name}}</p>
						<div class="baseinfo">
							<span class="jifen">积分：{{score}}</span>
							<span class="lasttime">注册时间：{{create_at | getDateTime}}</span>
						</div>
					</div>
				</div>
			</div>
			<!-- 创建主题 -->
			<div class="userTopics">
				<div class="userTopicsTitle">创建主题</div>
				<div class="userTopicsBox">
					<div v-for="topic in recent_topics" class="topicsitem clearfix">
						<router-link :to="{name:'article',params:{id:topic.id}}">
							<a class="avatar" href="javascript:void(0);">
								<img :src="topic.author.avatar_url" :alt="topic.author.loginname">
							</a>
							<div class="art-inf">
								<a class="title">{{topic.title}}</a>
								<span class="last-time">{{topic.last_reply_at | getLastTime }}</span>
							</div>
						</router-link>
					</div>
					<div class="nodata" v-if="topicsShow">
						<div class="nodataimg"></div>
						还没有创建主题
					</div>
				</div>
			</div>
			<!-- 参与的主题 -->
			<div class="userReplies">
				<div class="userRepliesTitle">参与主题</div>
				<div class="userRepliesBox">
					<div v-for="replies in recent_replies" class="repliesitem clearfix">
						<router-link :to="{name:'article',params:{id:replies.id}}">
							<router-link class="avatar" :to="{name:'userhome',params:{username:replies.author.loginname}}">
								<img :src="replies.author.avatar_url" :alt="replies.author.loginname">
							</router-link>
							<div class="art-inf">
								<a class="title">{{replies.title}}</a>
								<span class="last-time">{{replies.last_reply_at | getLastTime }}</span>
							</div>
						</router-link>
					</div>
					<div class="nodata" v-if="repliesShow">
						<div class="nodataimg"></div>
						还没有参与主题讨论
					</div>
				</div>
			</div>
			<!-- 收藏主题 -->
			<div class="userCollect">
				<div class="userCollectTitle">收藏主题</div>
				<div class="userCollectBox">
					<div v-for="collect in topic_collect" class="collectitem clearfix">
						<router-link :to="{name:'article',params:{id:collect.id}}">
							<router-link class="avatar" :to="{name:'userhome',params:{username:collect.author.loginname}}">
								<img :src="collect.author.avatar_url" :alt="collect.author.loginname">
							</router-link>
							<div class="art-inf">
								<a class="title">{{collect.title}}</a>
								<span class="last-time">{{collect.last_reply_at | getLastTime }}</span>
							</div>
						</router-link>
					</div>
					<div class="nodata" v-if="collectShow">
						<div class="nodataimg"></div>
						没有收藏主题
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import nvHeader from '../components/header.vue';
	export default {
		data : function() {
			return {
				user_name : '',
				user_avatar : '',
				score : 0,
				create_at : '',
				topicsShow : false,
				recent_topics : [],
				repliesShow : false,
				recent_replies : [],
				collectShow : false,
				topic_collect : []
			}
		},
		watch : {
			// 当在userhome内的子路有发生改变时调用
			$route : 'getUserHome'
		},
		mounted : function() {
			this.getUserHome();	
		},
		methods : {
			// 用户参与主题
			getUserHome : function() {
				this.user_name = this.$route.params.username;
				// 获取创建主题列表和参与话题列表
				axios.get('https://cnodejs.org/api/v1/user/'+this.user_name)
				.then((response) => {
					if (response.data.success) {
						const d = response.data;
						this.user_avatar = d.data.avatar_url;
						this.score = d.data.score;
						this.create_at = d.data.create_at;
						this.recent_topics = d.data.recent_topics;
						this.recent_replies = d.data.recent_replies;
						// 判断创建话题数和参与话题数，如果为0显示文案提示
						this.recent_topics.length === 0 ? this.topicsShow = true : this.topicsShow = false;
						this.recent_replies.length === 0 ? this.repliesShow = true : this.repliesShow = false;
					}
				})
				.catch(function(error) {
					console.log(error);
				})
				// 获取收藏主题列表
				axios.get('https://cnodejs.org/api/v1/topic_collect/'+this.user_name)
				.then((response) => {
					if (response.data.success) {
						const d = response.data;
						this.topic_collect = d.data;
						this.topic_collect.length === 0 ? this.collectShow = true : this.collectShow = false
					}
				})
				.catch(function(error) {
					console.log(error);
				})
			}
		},
		components : {
			nvHeader
		}
	}
</script>
<style lang="sass">
	.userhome {
		overflow: hidden;
    	margin: 0 5px;
    	padding: 4rem 0 2rem;
    	.userInfo {
			.userInfoTitle {
    			border-radius: 7px 7px 0 0; 
    			background: #fff;
				padding: 10px;
				color: #80bd01;
				font-size: 14px;
			}
			.userInfoBox {
				margin-top: 5px;
				padding: 10px;
				background: #fff;
				opacity: 0.8;
				.useravatar {
					margin: 0 auto;
					img {
						display: block;
						width: 80px;
						height: 80px;
						margin: 0 auto;
						border-radius: 40px;
					}
				}
				.userbase {
					.name {
						color: #A8B5C3;
						font-size: 22px;
						text-align: center;
						line-height: 40px;
					}
					.baseinfo {
						color: #A8B5C3;;
						font-size: 16px;
						text-align:center;
						span {
							margin-right: 20px;
						}
					}
				}
			}
    	}
    	.userTopics, .userReplies, .userCollect {
    		margin-top: 5px;
    		.userTopicsTitle, .userRepliesTitle, .userCollectTitle {
    			background: #fff;
				padding: 10px;
				color: #80bd01;
				font-size: 14px;
			}
			.userTopicsBox, .userRepliesBox, .userCollectBox {
				margin-top: 5px;
				padding-top: 10px;
				background: #fff;
				opacity: 0.8;
				.topicsitem, .repliesitem, .collectitem {
					position: relative;
					padding: 10px;
					background: #fff;
					border-bottom: 1px solid #e1e1e1;
					.avatar {
						display: block;
						float: left;
						width: 2rem;
						height: 2rem;
						img {
							display: inline-block;
							width: 100%;
							height: 100%;
						}
					}
					.art-inf {
						position: relative;
						float: left;
						width: 80%;
						height: 2rem;
						margin-left: 15px;
						a {
							display: inline-block;
							overflow: hidden;
							width: 80%;
							height: 2rem;
							color: #000;
							font-size: 1rem;
							line-height: 2rem;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
						span {
							display: inline-block;
						}
						.last-time {
							position: absolute;
							right: 0px;
							bottom: 0px;
							font-size: 12px;
							padding: 2px 4px;
						}
					}
				}
				.nodata {
					position: relative;
					padding-top: 40px;
					color: #A8B5C3;
					font-size: 16px;
					text-align: center;
					line-height: 40px;
					.nodataimg {
						position: absolute;
						width: 40px;
						height: 40px;
						left: 0px;
						top: 0px;
						right: 0px;
						margin: auto;
						background: url('../img/nodata.png') no-repeat;
						background-size: 100%;
					}
				}
			}

    	}
	}
</style>