<template>
  <div class="text-center">
  	{{user}}
    <h1>Youtube Vue</h1>
  	<input type="text" v-model="searchTerm" @keyup.enter="getVideo"> <button  @click="getVideo">Submit</button>  <button @click="paused">pause vid</button> <button @click="playing">play</button>
		<hr>
		<div class="row">
       <div class="col-md-8">
        <youtube :video-id="vidid" @ready="ready" @playing="playing" @paused="paused"></youtube> 
      </div>  
      <div class="col-md-4">
         <app-chat :messages="messages"></app-chat>
         <input type="" name="" v-model="inputMessage" @keyup.enter.prevent="createMessage">   <button @click="createMessage">send</button>
      </div>
    </div>
  
		<hr>
		<div>
			<app-video-grid :results="results" @selectedVideo="vidId = $event"></app-video-grid>
		</div>
			
  </div>
  
</template>

<script>
import { serverBus} from '../main';
import VideoGrid from './VideoGrid.vue';
import Chat from './Chat.vue'
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
      user: undefined,
      inputMessage: '',
      messages: []
   
  		
  	};
  
  },
  components: {
  	appVideoGrid: VideoGrid,
    appChat: Chat

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
    },
    createMessage() {
      this.$socket.emit('createMessage',this.inputMessage);
      
      this.inputMessage = '';
    },
    ready(player) {
      console.log('ready');
      this.player = player;

    },
    playing(player) {
      this.player.playVideo();
      this.$socket.emit('play', this.vidid);
    },
    
    paused () {
      console.log('works');
      this.player.pauseVideo();
      this.$socket.emit('pause', 'pause');
    },
    changeVideo(vidid, callback) {
      this.vidid = vidid;
      callback();
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
    
    if(this.$cookie.get('user')) {
      this.user = JSON.parse(this.$cookie.get('user'));
      this.loggedIn = false;
    } else {
      window.location.href = '/login';
      alert('must be logged in');
    }
    this.$socket.emit('join', {user: this.user, room: this.$route.query.id}, (e) => {

    });
    
  },
  sockets: {
      connect: function(){
        console.log('socket connected')
      },
      newMessage: function(msg) {
        console.log(msg);
        this.messages.push(msg);
      },
      playVideo: function(vidid) {
        var vm = this;
        console.log('change');
        this.changeVideo(vidid, function() {
          console.log('play');
          vm.player.playVideo();
        });
        
      },
      pauseVideo: function(msg) {
        console.log(msg);
        this.player.pauseVideo();
      }
    }

  
  
   
}
</script>

<style>

</style>