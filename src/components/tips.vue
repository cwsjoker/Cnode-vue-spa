<template>
	<div class="page-cover">
		<div class="alert">
			<div class="con"></div>
			<div class="ok">OK</div>
		</div>
	</div>
</template>
<script>
	
</script>
<style lang="sass">
	.page-cover {
		    position: fixed;
		    width: 100%;
		    height: 100%;
		    top: 0;
		    left: 0;
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
			    .con {
			    	padding: 0 20px;
				    font-size: 15px;
				    color: #888;
			    }
			    .ok {
				    position: relative;
				    line-height: 42px;
				    margin-top: 20px;
					color: #0bb20c;
				    font-size: 17px;
				    display: -webkit-box;
				    display: -ms-flexbox;
				    display: flex;
			    }
		    }
		    .alert-transition {
		    	opacity: 1;
				webkit-transition-duration: .4s;
    			transition-duration: .4s;
		    }
	}
</style>