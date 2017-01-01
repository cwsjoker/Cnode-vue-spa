<template>
	<div>
		<transition name="fade" class="router">
			<router-view class="r"></router-view>
		</transition>
	</div>
</template>
<style lang="sass">
	.fade-enter-active, .fade-leave-active {
		transition: all .3s ease;
		transform: translateX(0px);
	}
	.fade-enter, .fade-leave-active {
		transform: translateX(-100%);
		opacity: 0;
	}
	.router {
		width: 100%;
		/*transform: translateX(-300px);*/
		/*position: absolute;*/
		/*transition: all .9s cubiz-bezier(.55, 0, .1, 1);*/
	}
	.r {
		width: 100%;
		position: absolute;
	}
</style>