<template>
  <div id="room-comp">
    <div id="navbar">
      <app-navbar></app-navbar>
    </div>
   <!--  <video id="video" width="400" height="300" autoplay></video> -->
   <vue-webcam ref='webcam'></vue-webcam> <button @click='stop'>stop</button> <button @click="play">play</button>
    <div id="room">
      <!-- chat box html -->
      <div id="chat-box">
        <div id="chat-box-top">
          <div v-for="users in usersArray" id="user-box">
             <p class="text-center " id="">{{users}}</p>
          </div>
        </div>
         
        
        <div id="chat-messages">
          <app-chat :messages="messages"></app-chat>
        </div>
        
        <div id="chat-input-box">
          <div id="chat-input" class="text-center">
            <input placeholder="Send a message" v-model="inputMessage" @keyup.enter.prevent="createMessage">   
          </div>
        </div>
      </div> 
    </div>
	  
    <!-- video player -->
    <div class="row">
      <div class="col-md-8">
        <div id="video">
           <youtube :video-id="vidid" @ready="ready" @playing="playing" @paused="paused" player-width="1010" player-height="600"></youtube> 
        </div>
      </div>  
    </div>
  
		<hr>
		  
    <!-- search bar -->
    <div class="container">
      <div class="row">
            <div class="col-sm-6 col-sm-offset-3">
                <div id="imaginary_container"> 
                    <div class="input-group stylish-input-group">
                        <input type="text" class="form-control"  v-model="searchTerm"  placeholder="Search" @keyup.enter="getVideo">
                        <span class="input-group-addon" @click="getVideo">
                            <button type="submit" >
                                <span class="glyphicon glyphicon-search"></span>
                            </button>  
                        </span>
                    </div>
                </div>
            </div>
      </div>
    </div>
    
    <div id="vid-grid">
			<app-video-grid :results="results" @selectedVideo="vidId = $event"></app-video-grid>
		</div>
   <br> <br> <br> <br> <br> <br> 
  </div>

</template>

<script>
  var somePromise = new Promise((resolve,reject) => {
    resolve('it works!');
  });
import VueWebcam from 'vue-webcam';
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
    appNavbar: Navbar,
    VueWebcam: VueWebcam
    
  
  },
  methods: {
  	getVideo() {
  		this.reset();
  		this.$http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q='+this.searchTerm+'&type=video&maxResults=50&key=AIzaSyDta5IM-2Dm1BZwsRRIUbGvv20NcnovaKQ')
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
      this.$http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=' +this.selectedChannel+ '&type=video&maxResults=50&order=date&key=AIzaSyDta5IM-2Dm1BZwsRRIUbGvv20NcnovaKQ')
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
        this.thumbnails.push(data[i].snippet.thumbnails.medium.url);
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
    },
    play() {
      this.$refs.webcam.play();
    },
    stop() {
      this.$refs.webcam.stop()
    }
    
  },
  created() {
		serverBus.$on('selectedVideo', (data)=> {
				
      this.changeVideo(data).then(() => {
        this.player.playVideo();
        window.scrollTo(0, 0);
      });

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
    overflow-y: scroll; 
    word-wrap: break-word;
  
  }
  #chat-input-box { 
    margin-top: 19px;
    background-color: #e9ebee;
    width: 352px;
    border-radius: 5px;
    height: 49px;
    /*position: absolute;*/
  }

  #chat-input input {
    margin-top: 10px;
    width: 250px;
    border-radius: 3px;
  }

  #chat-box-top {
    width: 352px;
    border-radius: 1px;
    height: 100px;
    background-color: #e9ebee;
    border-bottom-style: solid;
    border-bottom-color: #e9ebee;
    border-bottom-width: 2px;
  
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
  }


  #video {
    margin-left: 30px;
    margin-top: 80px;
  }

  

  .stylish-input-group .input-group-addon{
    background: white !important; 
    
  }
  .stylish-input-group .form-control{
    border-right:0; 
    box-shadow:0 0 0; 
    border-color:#ccc;
  }
  .stylish-input-group button{
      border:0;
      background:transparent;
  }

  #vid-grid {
    margin-top: 30px;
  }

  #user-box {
    width: 70px;
    height: 100px;
    margin-left: 5px;
    display: inline-block;
    border-radius: 5px;
    margin-top: 10px;
    background-image: url("../assets/img/no-pic.jpg");
    background-size: 100%;
    background-repeat: no-repeat;
    border-color: white;
    border-width: 2px;
    cursor: pointer;
  }


  #user-box p {
    width: 100%;
    height: 15px;
    background-color: white;
    margin-top: 60px;
    font-size: 12px;
    font-weight: 300;
    border-radius: 2px;
    color: #41464b;
  }
  
</style>