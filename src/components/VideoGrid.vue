<template>
  <div class="row">
		<app-video v-for="result in results" :result="result"> </app-video>
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