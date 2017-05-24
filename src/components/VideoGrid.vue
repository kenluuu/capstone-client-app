<template>
  
	<div class="container">
  	<div class="row">
			<!-- <div class="col-4-md"> -->
					<transition-group appear name="slide" > 
				<app-video v-for="(result, i) in results" :result="result" :key="i"> </app-video>
				 </transition-group>
			<!-- </div> -->
	 	</div>
  </div>
 
 
  
</template>

<script>

import Video from './Video.vue'
export default {
	data() {
		return {
			
		};
	},
	props: ['results'],
	components: {
		appVideo: Video
	}
}
</script>

<style>
	/*.enter-active {
		
	}
	.leave-active {
		animation-duration: 20s;
		animation-delay: .1s;
	}*/

	.slide-enter {
		opacity: 0;
	}
	.slide-enter-active {
		animation: slide-in 3s ease-out forwards;
		animation-delay: 2s;
		transition: opacity 2s;
	}

	.slide-leave {

	}

	.slide-leave-active {
		animation: slide-out 3s ease-out forwards;
		transition: opacity 1s;
		animation-delay: 2s;
		opacity: 0;

	}

	@keyframes slide-in {
		from {
			transform: translateY(150px);
		}
		to {
			transform: translateY(0px);
		}
	}

	@keyframes slide-out {
		from {
			transform: translateY(0px);
		}
		to {
			transform: translateY(150px);
		}
	}
</style>