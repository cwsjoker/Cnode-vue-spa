<template>
	<div>
		<nv-header></nv-header>
		<div class="artlist">
			<ul class="artlistTab clearfix">
				<li v-for="(item, index) in itemTab" :class="{'on':initIndex === index}" v-on:click="changeTab(index)">{{item.title}}</li>
			</ul>
			<div class="artlistCon">
				<router-link v-for="art in artlist" class="artitem clearfix" :to="{name:'article',params:{id:art.id}}">
					<router-link class="avatar" href="javascript:void(0);" :to="{name:'userhome',params:{username:art.author.loginname}}">
						<img :src="art.author.avatar_url" :alt="art.author.loginname">
					</router-link>
					<div class="art-inf">
						<em :title="art.tab | getArticleTab(art.good, art.top)"
							:class="art.good | getArticleClass(art.top)">
							{{art.tab | getArticleTab(art.good, art.top)}}
						</em>
						<a class="title">{{art.title}}</a>
						<span class="rp-count">{{art.reply_count}}/{{art.visit_count}}</span>
						<span class="last-time">{{art.last_reply_at | getLastTime }}</span>
					</div>
				</router-link>
			</div>
			<div class="loadingbox" v-show="showLoading">
				<div class="loading"></div>
			</div>
		</div>
		<nv-top></nv-top>
	</div>
</template>
<script>
	import axios from 'axios';
	import nvHeader from '../components/header.vue';
	import nvTop from '../components/returnTop.vue';
	export default {
		data : function() {
			return {
				initIndex : 0,
				scroll : true, //避免快速滚动，无限拉取数据源
				showLoading : false, //加载列表小icon
				itemTab : [
					{'title' : '全部', 'type' : 'all'},
					{'title' : '精华', 'type' : 'good'},
					{'title' : '分享', 'type' : 'share'},
					{'title' : '问答', 'type' : 'ask'},
					{'title' : '招聘', 'type' : 'job'}
				],
				artlist : [],
				searchKey : {
					'page' : 1,
					'limit' : 20, //每页加载20条
					'tab' : 'all' //分页 有all ask share job good
				}
				
			}
		},
		mounted : function() {
			this.gerArtlist(this.initIndex);
            window.addEventListener('scroll', this.scrollArtlist, false);
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
				let rqdata = this.searchKey;
				axios.get('https://cnodejs.org/api/v1/topics', {
					params : rqdata
				})
				.then((response) => {
					if (response.data.success) {
						this.artlist = response.data['data'];
						this.scroll = true;
						this.showLoading = false;
					}
				})
				.catch((error) => {
					console.log(error);
				})
			},
			// 超过滚动获取数据方法
			scrollArtlist : function() {
				if (this.scroll) {
					let totalheight = parseFloat(window.innerHeight) + parseFloat(window.scrollY);
	          		if (document.body.clientHeight <= totalheight + 200) {
	                    this.scroll = false;
	                    this.searchKey.limit += 20;
	                    this.showLoading = true;
	                    setTimeout(() => {
	                    	this.gerArtlist();
	                    }, 2000)
	                }
				}
			}
		},
		components : {
			nvHeader,
			nvTop
		},
		beforeDestroy : function() {
			// 退出组件解除window的scroll事件,防止别的页面下拉加载。
			window.removeEventListener('scroll', this.scrollArtlist, false);
		}
	}
</script>
<style lang="sass">
	.artlist{
		overflow: hidden;
		margin: 0 5px;
		padding-top : 4rem;
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
				display: inline-block;
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
					z-index: 5;
					img {
						display: inline-block;
						width: 100%;
						height: 100%;
					}
				}
				.art-inf {
					position: relative;
					width: 80%;
					height: 100%;
					padding-left: 2.5rem;
					a {
						display: inline-block;
						overflow: hidden;
						width: 80%;
						height: 1.2rem;
						color: #000;
						font-size: 1rem;
						line-height: 1.2rem;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					span, em {
						display: inline-block;
					}
					em {
						padding: 2px 4px;
						background: #e5e5e5;
						border-radius: 3px;
					    -webkit-border-radius: 3px;
					    -moz-border-radius: 3px;
					    -o-border-radius: 3px;
						color: #999;
					    font-size: 0.8rem;
					}
					.put_good, .put_top {
						background: #80bd01;
					    color: #fff;
					}
					.rp-count {
						margin-left:10%;
						font-size: 12px;
						padding: 2px 4px;
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

		}
		.loadingbox {
			position: relative;
			width: 100%;
			height: 40px;
			.loading {
				position: absolute;
				width: 25px;
				height: 25px;
				left: 0px;
				top: 0px;
				right: 0px;
				bottom: 0px;
				margin: auto;
				background: url('../img/loading.gif') no-repeat;
				background-size: 100%;
			}
		}
	}
</style>