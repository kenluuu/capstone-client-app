<template>
  <div id="room-comp">
	  <div id="navbar">
      <app-navbar></app-navbar>
    </div>
    <div id="room">
      <div id="chat-box">
        <div id="chat-box-users">
           <div id="chat-users">
             
           </div>
        </div>
        
        <div id="chat-messages">
          <app-chat :messages="messages" ></app-chat>
        </div>
        <div id="chat-input-box">
          <div id="chat-input" class="text-center">
            <input placeholder="Send a message" v-model="inputMessage" @keyup.enter.prevent="createMessage">   
          </div>
        </div>
      </div> 
    </div>
	<div class="row">
    <div class="col-md-8">
      <div id="video">
         <youtube :video-id="vidid" @ready="ready" @playing="playing" @paused="paused" player-width="1010" player-height="600"></youtube> 
      </div>
    </div>  
  </div>
  
		<hr>
		<input type="text" v-model="searchTerm" @keyup.enter="getVideo"> <button  @click="getVideo">Submit</button> 
    <div>
			<app-video-grid :results="results" @selectedVideo="vidId = $event"></app-video-grid>
		</div>
			
  </div>
  
</template>

<script>
  var somePromise = new Promise((resolve,reject) => {
    resolve('it workds!');
  });


import Navbar from './Navbar.vue'
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
      messages: [],
      usersArray: [],
      currentTime: undefined
  		
  	};
  
  },
  components: {
  	appVideoGrid: VideoGrid,
    appChat: Chat,
    appNavbar: Navbar
  
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
    changeVideo(vidid) {
      return new Promise((resolve,reject) => {
        this.vidid = vidid;
        resolve();
      });
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
      this.$socket.emit('join', {user: this.user, room: this.$route.query.id}, (e) => {
      
      });
    } else {
      window.location.href = '/login';
      alert('must be logged in');
    }

    
  },
  sockets: {
    connect: function(){
      console.log('socket connected')
    },
    newMessage: function(msg) {
      console.log(msg);
      this.messages.push(msg);
    },
    updateUsersArray: function (users) {
      this.usersArray = users;
    },
    playVideo: function(vidid) {
     
      
      // somePromise.then((message) => {
      //   this.vidid = vidid;
      // }).then(() => {
      //   this.player.playVideo();
      // });
      var vm = this;
      this.changeVideo(vidid).then(() => {
        vm.player.playVideo();
      });
      
    },
    pauseVideo: function(msg) {
      console.log(msg);
      this.player.pauseVideo();
    }
  },
  destroyed() {
    this.$socket.emit('disconnect');
  }
   
}
</script>

<style >
  


  #chat-box {
    margin-top: 80px;
    width: 25%;
    height: 600px;
    float: right;
    background-color: #fff;
    border-style: solid;
    border-width: 2px;
    border-color: #e9ebee;
    display: block;
    margin-right: 20px;
    border-radius: 5px;
  }
  #chat-messages {
   
    width: 100%; 
    height: 430px;
    overflow-y: auto; 
    word-wrap: break-word;
  }
  #chat-input-box { 
    width: 100%;
    height: 8%;
    background-color: #e9ebee;
  }

  #chat-input input {
    margin-top: 10px;
    width: 250px;
    border-radius: 3px;
  }

  #chat-box-users {
    width: 100%;
    height: 20%;
    background-color: #e9ebee;
    border-bottom-style: solid;
    border-bottom-color: #e9ebee;
    border-bottom-width: 2px;
  }


  #video {
    margin-left: 30px;
    margin-top: 80px;
  }

  #player {
    border-style: solid;
  }
</style>