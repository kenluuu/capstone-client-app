<template>

	  <div id="vid-content" class="col-md-3">
	  	<div>
	  		<img id="thumbnail" :src="result.vidThumbnail" @click="getVideo" width="196" height="110">
	  	</div>
	  	<div id="title" @click="getVideo">
	  		<p class="">{{result.vidTitle}}</p>
	  	</div>
	  	<div @click="getChannelVideos" id="channel">
	  		<p>{{result.vidChannelTitle}}</p>
	  	</div>
	  </div>
	
</template>

<script>

	import { serverBus} from '../main';
	export default {
		props: ['result'],
		
		methods: {
			getVideo() {
				serverBus.$emit('selectedVideo', this.result.vidId);
			},
			getChannelVideos() {
				serverBus.$emit('selectedChannelVideo', this.result.vidChannelId);
			}
		}
	}
</script>

<style>
	
	#vid-content {
		background-color: transparent;
		width: 220px;
		height: 200px;
		animation-delay: .1s;
		animation-duration: 1s;
	}
	#thumbnail {
		cursor: pointer;
	}

	#title p{
		font-size:14px;
		font-weight: 400;
		color: #167ac6;
		
		
	}
	#title {
		
		width: 195px;
 		
  	overflow: hidden;
  	text-overflow: ellipsis;
		height: 42px;
	}
	#channel p {
		font-size: 12px;
		font-weight: 300;
		color: #41464b;
	}

	#title:hover {
		cursor: pointer;
		text-decoration: underline;
	}

	#channel:hover {
		cursor: pointer;
		text-decoration: underline;
	}

</style>