<template>
  <div class="text-center">
  	{{user}}
    <h1>Youtube Vue</h1>
  	<input type="text" v-model="searchTerm" @keyup.enter="getVideo"> <button  @click="getVideo">Submit</button> 
		<hr>
		<div>
			<youtube :video-id="vidid"></youtube>
		</div>
		<hr>
		<div>
			<app-video-grid :results="results" @selectedVideo="vidId = $event"></app-video-grid>
		</div>
			
  </div>
  
</template>

<script>
import { serverBus} from '../main';
import VideoGrid from './VideoGrid.vue'
export default {
  data() {
  	return {
  		searchTerm: '',
  		videoId:[],
  		title:[],
  		thumbnails:[],
  		results: [],
  		vidid: 'fzQ6gRAEoy0',
  		channelTitle: [],
      channelId:[],
      selectedChannel: '',
      user: {}
   
  		
  	};
  
  },
  components: {
  	appVideoGrid: VideoGrid
  },
  methods: {
  	getVideo() {
  		this.reset();
  		this.$http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q='+this.searchTerm+'&type=video&maxResults=10&key=AIzaSyDta5IM-2Dm1BZwsRRIUbGvv20NcnovaKQ')
  				.then(response => {
  					return response.json();
  				})
  				.then(data => {
  					console.log(data.items);
  					this.update(data.items)
  				});
  	},
    getChannelVideos() {
      this.reset();
      this.$http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +this.selectedChannel+ '&type=video&maxResults=10&order=date&key=AIzaSyDta5IM-2Dm1BZwsRRIUbGvv20NcnovaKQ')
          .then(response => {
            return response.json();
          })
          .then(data => {
            console.log(data.items);
            this.update(data.items)
          });
    },
    reset() {
      this.videoId = [];
      this.title = [];
      this.thumbnails = [];
      this.results = [];
      this.channelTitle = [];
      this.channelId = [];
    },
    update(data) {
      for(var i = 0; i < data.length; i++) {
        this.videoId.push(data[i].id.videoId);
        this.channelTitle.push(data[i].snippet.channelTitle);
        this.channelId.push(data[i].snippet.channelId);
        this.title.push(data[i].snippet.title);
        this.thumbnails.push(data[i].snippet.thumbnails.default.url);
        this.results.push({
          vidId: this.videoId[i],
          vidTitle: this.title[i],
          vidThumbnail: this.thumbnails[i],
          vidChannelTitle: this.channelTitle[i],
          vidChannelId: this.channelId[i]
        });
      } 
    }
  },
  created() {
		serverBus.$on('selectedVideo', (data)=> {
				this.vidid = data;
    });
    serverBus.$on('selectedChannelVideo', (data)=> {
        console.log(data);
        this.selectedChannel = data;
        console.log(this.selectedChannel);
        this.getChannelVideos();
    });
 
  },
  beforeRouteEnter(to, from, next) {
     
    var user = {}
    serverBus.$on('userInfo',  (data) =>{
      console.log(data);
      user = data;
      next((vm)=> {
        vm.user = user;
      });
    }); 
  } 
}
</script>

<style>

</style>