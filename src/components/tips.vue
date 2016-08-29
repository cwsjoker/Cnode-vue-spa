<template>
	<div v-if="tipShow" class="tips-cover">
		<div class="alert">
			<div class="tipcon">{{tipContent}}</div>
			<div class="ok" @click="isHide">OK</div>
		</div>
	</div>
</template>
<script>
	import {setTipShow, setTipContent} from '../vuex/actions';
	import {getTipShow, getTipContent} from '../vuex/getters';
	export default {
		methods : {
			isHide : function() {
				this.setTipShow(false);
				this.setTipContent('');
			}
		},
		vuex : {
			actions : {
				setTipShow : setTipShow,
				setTipContent : setTipContent
			},
			getters : {
				tipShow : getTipShow,
				tipContent : getTipContent
			}
		}

	}
</script>
<style lang="sass">
	.tips-cover {
		    position: fixed;
		    width: 100%;
		    height: 100%;
		    top: 0;
		    left: 0;
		    z-index: 10000;
		    background: rgba(0,0,0,.6);
    		-webkit-transition: opacity 3.2s linear;
    		transition: opacity 3.2s linear;
		    .alert {
		    	position: fixed;
			    z-index: 5000;
			    width: 85%;
			    top: 50%;
			    left: 50%;
			    -webkit-transform: translate(-50%,-50%);
			    transform: translate(-50%,-50%);
			    background-color: #fafafc;
			    text-align: center;
			    border-radius: 3px;
			    overflow: hidden;
			    transition-property: transform,opacity,-webkit-transform!important;
			    .tipcon {
			    	padding: 20px 20px;
				    font-size: 15px;
				    color: #888;
			    }
			    .ok {
				    position: relative;
				    line-height: 42px;
				    margin-top: 20px;
					color: #0bb20c;
				    font-size: 17px;
				    text-align: center;
			    }
		    }
		    .alert-transition {
		    	opacity: 1;
				webkit-transition-duration: .4s;
    			transition-duration: .4s;
		    }
	}
	.tips-leave {
		opacity : 0;
	}
</style>