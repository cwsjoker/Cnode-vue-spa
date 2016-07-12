<template>
	<nv-header></nv-header>
	<div class="article">
		<div class="articlebox">
			<div class="articletitle">
				<h2>{{art.title}}</h2>
				<div>
					<span>发布于{{art.createtime}}</span>
					<span>作者{{art.author_name}}</span>
					<span>{{art.reply_count}}/{{art.visit_count}}</span>
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
						<span>{{reitem.create_at}}</span>
					</div>
					<div class="repliescon">
						<div class="repliescontent" v-html="reitem.content"></div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	module.exports = {
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
				articleId : ''
			}
		},
		route : {
			data (transition){
				var _this = this;
				_this.articleId = transition.to.params.id;
				console.log(_this.articleId);
				$.get('https://cnodejs.org/api/v1/topic/'+_this.articleId,function(d){
                    if(d && d.data){
                        console.log(d.data);
                    	var D = d.data;
                    	_this.art.title = D.title;
                    	_this.art.content = D.content;
                    	_this.art.createtime = D.create_at;
                    	_this.art.author_name = D.author.loginname;
                    	_this.art.author_avatar = D.author.avatar_url;
                    	_this.art.visit_count = D.visit_count;
                    	_this.art.reply_count = D.reply_count;
                    	_this.replies = D.replies;
                    }
                });
			}
		},
		components : {
			'nv-header' : require('../components/header.vue')
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
			> div {
				width: 100%;
				padding: 10px;
			}
			li {
				
				padding: 10px;
				.author_content {
					img, span {
						float:left;
						display:inlin-block;
					}
					img {
						width: 30px;
						height: 30px;
					}
				}
				.repliescon {
					margin-top: 10px;
					line-height: 18px;
				}
			}
		}

	}
</style>