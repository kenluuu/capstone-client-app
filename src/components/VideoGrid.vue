<template>
  
	<div class="container">
  	<div class="row">
			<!-- <div class="col-4-md"> -->
				
				<app-video v-for="result in results" :result="result"> </app-video>
				
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
	
</style>