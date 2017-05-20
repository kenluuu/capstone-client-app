<template>
  <div id="vid-grid">
  	<div class="container">
  	<div class="row">
			<app-video v-for="result in results" :result="result"> </app-video>
	 	</div>
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
	html, body {
		background-color: transparent;
	}
	#vid-grid {

		background-color: transparent;
	}
</style>