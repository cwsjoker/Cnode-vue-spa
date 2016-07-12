<template>
	<nv-header></nv-header>
	<div class="artlist">
		<ul class="artlistTab clearfix">
			<li v-for="item in itemTab" :class="{'on':initIndex === $index}" v-on:click="changeTab($index)">{{item.title}}</li>
		</ul>
		<div class="artlistCon">
			<div v-for="art in artlist" class="artitem clearfix" v-link="{name:'article',params:{id:art.id}}">
				<a class="avatar" href="javascript:void(0);">
					<img :src="art.author.avatar_url" :alt="art.author.loginname">
				</a>
				<div class="art-inf">
					<p class="title">{{art.title}}</p>
					<span>{{art.reply_count}}/{{art.visit_count}}</span>
					<span>{{art.create_at | getDateTime }}</span>
				</div>
			</div>
		</div>
	</div>
	<nv-top></nv-top>
</template>
<script>
	// js
	module.exports = {
		data : function() {
			return {
				initIndex : 0,
				scroll : true,
				itemTab : [
					{'title' : '全部', 'type' : 'all'},
					{'title' : '精华', 'type' : 'good'},
					{'title' : '分享', 'type' : 'share'},
					{'title' : '问答', 'type' : 'ask'},
					{'title' : '招聘', 'type' : 'job'}
				],
				artlist : [],
				searchKey : {
					page : 1,
					limit : 20, //每页加载20条
					tab : 'all' //分页 有all ask share job good
				}
				
			}
		},
		ready : function() {
			var _this = this;
			_this.gerArtlist(_this.initIndex);
			$(window).on('scroll',function(){
                _this.scrollArtlist();
             });
		},
		methods :  {
			// 标签tab切换方法
			changeTab : function(index) {
				this.initIndex = index;
				this.searchKey.tab = this.itemTab[index].type;
				this.artlist = [];
				this.searchKey.limit = 20;
				this.gerArtlist(this.initIndex);
			},
			// 获取数据方法
			gerArtlist : function() {
				var rqdata = $.param(this.searchKey);
				var _this = this;
				$.get('https://cnodejs.org/api/v1/topics?' + rqdata, function(data){
					if(data.success){
						_this.artlist = data['data'];
						_this.scroll = true;
					}
				})
			},
			// 超过滚动获取数据方法
			scrollArtlist : function() {
				if(this.scroll){
					var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
	          		if ($(document).height() <= totalheight + 200) {
	                    this.scroll = false;
	                    this.searchKey.limit += 20;
	                    this.gerArtlist();
	                }
				}
			}
		},
		components : {
			'nv-header' : require('../components/header.vue'),
			'nv-top' : require('../components/returnTop.vue')
		}
	}
</script>
<style lang="sass">
	.artlist{
		overflow: hidden;
		margin: 0 5px;
		.artlistTab {
			margin: 0 auto 10px;
			width: 100%;
			height: 3rem;
			background: #F6F6F6;
			border-radius: 7px;
			li {
				float: left;
				width: 15%;
				height: 2rem;
				margin: 0.5rem 0 0 4%;
				color: #80BD01;
				text-align: center;
				line-height: 2rem;
			}
			.on {
				background: #80BD01;
				color: #fff;
				border-radius: 5px;
			}
		}
		.artlistCon {
			width: 100%;
			.artitem {
				position: relative;
				width: 100%;
				/*height: 3rem;*/
				padding: 10px;
				background: #fff;
				border: 1px solid #e1e1e1;
				.avatar {
					display: inline-block;
					position: absolute;
					left: 10px;
					top: 10px;
					width: 2rem;
					height: 2rem;
					img {
						display: inline-block;
						width: 100%;
						height: 100%;
					}
				}
				.art-inf {
					width: 80%;
					height: 100%;
					padding-left: 2.5rem;
					p {
						overflow: hidden;
						width: 100%;
						height: 1rem;
						font-size: 0.8rem;
						line-height: 1rem;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					span {
						display: inline-block;
					}
				}
			}


		}
	}
</style>