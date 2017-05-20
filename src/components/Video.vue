<template>
  <div id="vids">
  	<div class="col-md-2" >
			<div class="panel panel-default">
	  		<div class="panel-body video">
	  			<div @click="getVideo">
	  				<div>
		  				<img :src="result.vidThumbnail">
		  			</div>
		  			<div>
		  				<a href="#"><p class="title">{{result.vidTitle}}</p></a>
		  			</div>
	  			</div>
		  		<div>
		  			<a href="#" @click="getChannelVideos"><p>{{result.vidChannelTitle}}</p></a>

		  		</div>	
		  		
		  	</div>
		  </div>
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

<style scoped>
	.video {
		cursor: pointer;
	}

	.video:hover {
		background-color: #ffe2e2;
	}

	.title{
		font-size: 12px;
	}

	#vids {
		
	}


</style>