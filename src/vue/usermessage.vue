<template>
	<nv-header></nv-header>
	<div class="message">
		<!-- 未读消息 -->
		<div class="unread">
			<div class="unread-title">未读消息</div>
			<div class="unread-box">
				<div v-for="message in hasnot_read_messages" class="passmessage-item">
					<a href="#" v-link="{name:'userhome',params:{username:message.author.loginname}}">{{message.author.loginname}}</a>
					{{message.text_desc}}
					<a href='#' @click="" v-link="{name:'article',params:{id:message.topic.id}}">{{message.topic.title}}</a>
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
					<a href="#" v-link="{name:'userhome',params:{username:message.author.loginname}}">{{message.author.loginname}}</a>
					{{message.text_desc}}
					<a href='#' v-link="{name:'article',params:{id:message.topic.id}}">{{message.topic.title}}</a>
					<em>{{message.create_at | getLastTime}}</em>
				</div>
				<div v-if="this.has_read_messages.length === 0" class="nodata">
					<div class="nodataimg"></div>
						没有消息
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import store from '../vuex/store';
	import {getLoginState, getUserInfo} from '../vuex/getters';
	import {setNotMessageCount} from '../vuex/actions';
	import nvHeader from '../components/header.vue';
	export default {
		data : function() {
			return {
				accesstoken : this.ache_getUserInfo.accesstoken,
				hasnot_read_messages : [],
				has_read_messages : []
			}
		},
		ready : function() {
			if(this.ache_userLoginState) {
				const rqdata = {
					'accesstoken' : this.accesstoken
				}
				$.post('https://cnodejs.org/api/v1/message/mark_all', rqdata, (d) => {
					if(d.success) {
						console.log('成功');
						// 设置未阅读数为0
						this.hand_setNotMessageCount(0);
					}
				})
			}
		},
		route : {
			data(transition) {
				const rqdata = {
					'accesstoken' : this.accesstoken
				};
				$.get('https://cnodejs.org/api/v1/messages', rqdata, (d) => {
					if(d.success) {
						for (const i of d.data.has_read_messages) {
							if(i.type === 'at') {
								i['text_desc'] = '@中你';
							} else if(i.type === 'reply') {
								i['text_desc'] = '回复你';
							}
						}
						this.has_read_messages = d.data.has_read_messages;
						for (const i of d.data.hasnot_read_messages) {
							if(i.type === 'at') {
								i['text_desc'] = '@中你';
							} else if(i.type === 'reply') {
								i['text_desc'] = '回复你';
							}
						}
						this.hasnot_read_messages = d.data.hasnot_read_messages;
					}
				})
			}
		},
		components : {
			'nv-header' : nvHeader
		},
		store : store,
		vuex : {
			actions : {
				hand_setNotMessageCount : setNotMessageCount
			},
			getters : {
				ache_userLoginState : getLoginState,
				ache_getUserInfo :  getUserInfo
			}
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