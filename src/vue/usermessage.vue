<template>
	<div>
		<nv-header></nv-header>
		<div class="message">
			<!-- 未读消息 -->
			<div class="unread">
				<div class="unread-title">未读消息</div>
				<div class="unread-box">
					<div v-for="message in hasnot_read_messages" class="passmessage-item">
						<router-link :to="{name:'userhome',params:{username:message.author.loginname}}">{{message.author.loginname}}</router-link>
						{{message.text_desc}}
						<router-link :to="{name:'article',params:{id:message.topic.id}}">{{message.topic.title}}</router-link>
						<em>{{message.create_at | getLastTime}}</em>
					</div>
					<div v-if="this.hasnot_read_messages.length === 0" class="nodata">
						<div class="nodataimg"></div>
							没有新消息
					</div>
				</div>
			</div>
			<!-- 过往消息 -->
			<div class="passmessage">
				<div class="passmessage-title">过往消息</div>
				<div class="passmessage-box">
					<div v-for="message in has_read_messages" class="passmessage-item">
						<router-link :to="{name:'userhome',params:{username:message.author.loginname}}">{{message.author.loginname}}</router-link>
						{{message.text_desc}}
						<router-link :to="{name:'article',params:{id:message.topic.id}}">{{message.topic.title}}</router-link>
						<em>{{message.create_at | getLastTime}}</em>
					</div>
					<div v-if="this.has_read_messages.length === 0" class="nodata">
						<div class="nodataimg"></div>
							没有消息
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
				hasnot_read_messages : [],	//未读消息条数
				has_read_messages : []	//已读消息条数
			}
		},
		mounted : function() {
			if (this.loginStatus) {
				// 获取当前用户的已读和未读消息
				const rqdata = {
					'accesstoken' : this.userInfo.accesstoken
				};
				axios.get('https://cnodejs.org/api/v1/messages', {
					params : rqdata
				})
				.then((response) => {
					const d = response.data;
					if (d.success) {
						for (const i of d.data.has_read_messages) {
							if (i.type === 'at') {
								i['text_desc'] = '@中你';
							} else if (i.type === 'reply') {
								i['text_desc'] = '回复你';
							}
						}
						this.has_read_messages = d.data.has_read_messages;
						for (const i of d.data.hasnot_read_messages) {
							if (i.type === 'at') {
								i['text_desc'] = '@中你';
							} else if (i.type === 'reply') {
								i['text_desc'] = '回复你';
							}
						}
						this.hasnot_read_messages = d.data.hasnot_read_messages;
					}
				})
				.catch(function(error) {
					console.log(error);
				})
		
				// 当用户进入页面标记以阅读
				axios.post('https://cnodejs.org/api/v1/message/mark_all', {
					'accesstoken' : this.userInfo.accesstoken
				})
				.then((response) => {
					if (response.data.success) {
						console.log('标记阅读成功');
						// 设置未阅读数为0
						this.$store.dispatch('setNotMessageCount', 0);
					}
				})
				.catch(function(error) {
					console.log(error);
				})
			}else {
				// 用户未登录返回登录页面
				this.$router.push({
					name : 'login'
				});
			}
		},
		computed : {
			loginStatus : function() {
				return this.$store.getters.getLoginState;
			},
			userInfo : function() {
				return this.$store.getters.getUserInfo;
			}
		},
		components : {
			nvHeader
		}
	}
</script>
<style lang="sass">
	.message {
		overflow: hidden;
    	margin: 0 5px;
    	padding: 4rem 0 2rem;
    	.passmessage, .unread {
    		margin-top: 5px;
    		.passmessage-title, .unread-title {
    			background: #fff;
				padding: 10px;
				color: #80bd01;
				font-size: 14px;
    		}
    		.passmessage-box, .unread-box {
    			margin-top: 5px;
				padding-top: 10px;
				background: #fff;
				opacity: 0.8;
				.passmessage-item, .unread-item {
					position: relative;
					padding: 10px;
					background: #fff;
					border-bottom: 1px solid #e1e1e1;
					span {

					}
					em {
						position: absolute;
					    right: 10px;
					    bottom: 10px;
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