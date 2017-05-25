<template>
    <div id="comp-home">
      <app-navbar></app-navbar>
      <section id="home">
        <transition appear   enter-active-class="animated fadeIn"> 
        <div id="home-cover" class="bg-parallax">
          <div id="home-content-box">
            <div id="home-content-box-inner" class="text-center">
              <transition appear   enter-active-class="animated zoomIn"> 
                <div id="home-heading">
                  <h3>Let's Watch <br> Youtube Together</h3>
                </div>
              </transition>
              <transition appear enter-active-class="animated zoomIn">
                <div id="home-btn">
                  <a href="#" class="btn btn-lg btn-white btn-general" @click="createRoom">Create Room</a>
                </div>
              </transition>
            </div>
          </div>
        </div>
        </transition>
      </section>
      <section id="features">
        <div class="content-box">
          <div class="content-title">
            <h3>Features</h3>
            <div class="content-title-underline"></div>
          </div>
          <div class="container">
            <div class="row">
              
              <div class="col-md-4">
                <div class="feature-item">
                  <div class="feature-item-icon">
                    <i class="fa fa-youtube-play fa-3x" ></i>
                  </div>
                  <div class="feature-item-title">
                    <h3>Youtube</h3>
                  </div>
                  <div class="feature-item-desc">
                    <p>Watch Youtube Videos with friends in real time.</p>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="feature-item">
                  <div class="feature-item-icon">
                    <i class="fa fa-comments fa-3x" a></i>
                  </div>
                  <div class="feature-item-title">
                    <h3>Chat</h3>
                  </div>
                  <div class="feature-item-desc">
                    <p>Talk in a bulit in chat room.</p>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="feature-item">
                  <div class="feature-item-icon">
                    <i class="fa fa-video-camera fa-3x"></i>
                  </div>
                  <div class="feature-item-title">
                    <h3>Facetime</h3>
                  </div>
                  <div class="feature-item-desc">
                    <p>Supports webcam and microphone.</p>
                  </div>
                </div>
              </div>
           
            </div>
          </div>
        </div>
      </section>
      <section id="about">
        <div id="about-bg-diagonal" class="bg-parallax"></div>
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <div id="about-content-box">
                  <div id="about-content-box-outer">
                    <div id="about-content-box-inner">
                      <div class="content-title">
                        <h3>Why Youtube&Chill?</h3>
                        <div class="content-title-underline"></div>
                      </div>
                      <div id="about-desc">
                        <p>Watching youtube with friends had to be done in person. Youtube&Chill makes it easy for friends to watch youtube videos together and relax no matter where they are. </p>
                      </div>
                      <div id="about-btn">
                        <a href="#" @click="createRoom" class="btn btn-lg btn-general btn-red">Let's Watch</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
      <br><br><br><br><br><br><br><br>
         
    </div>
    
	
</template>

<script type="text/javascript">
  import Navbar from './Navbar.vue';
  import {serverBus} from '../main';
  export default {
    data() {
      return {
        user: undefined
      }
    },
    created() {
      
      
    },
    methods: {
      createRoom() {
        var vm = this
        if(this.$cookie.get('user')) {
        
        this.user = JSON.parse(this.$cookie.get('user'));
        this.loggedIn = false;
        // var roomName = prompt('Please Enter a Name for your Room!');
        alertify.prompt( "Please Enter a Name for your Room!", function (e, str) {
          if (e) {
              // after clicking OK
              // str is the value from the textbox
              if (!str || 0 === str.length) {
                
                return alertify.alert('Invalid Name');
              }
              window.location.href = `/room?id=${str}`;
          } else {
              // after clicking Cancel
          }
        });

        
        } else {
          window.location.href = '/login';
          alert('you must be logged in');
        }
        
      }
    },
    components: {
      appNavbar: Navbar
    }  
  }

  
</script>

<style type="text/css">
	html, body {
    height: 100%;
    background-color: white;
  }

  #app {
    height: 100%;
    background-color: white;
  }
  #app-comp {
    height: 100%;
    background-color: white;
  }


  h3 {
  color: #41464b;
  text-transform: uppercase;
}

p {
  color: #64707b;
  font-size: 16px;
  font-weight: 300; 
}
  #comp-home {
    height: 100%;
    background-color: white;
  }

  #home {
    height: 100%;
     background-color: white;
  }

  #home-cover {
    height: 100%;
    background-image: url("../assets/img/home-bg.jpg");
  
  }

  #home-content-box {
    width: 100%;
    height: 100%;
    display: table;
  }

  #home-content-box-inner {
    display: table-cell;
    vertical-align: middle;
  }

  #home-heading h3 {
    color: #fff;
    font-size: 55px;
    font-weight: 700;
    text-transform: uppercase;

  }

  .btn-general {
    border-width: 2px;
    border-radius: 0;
    padding: 12px 26px 12px 26px;
    font-size: 16px;
    font-weight: 400;
    text-transform: uppercase;
  }

  .btn-white {
    border-color: #fff;
    color: #fff;
  }

  .btn-white:hover {
    background-color: #fff;
    color: #41464b;
  }

  .bg-parallax {
    background-repeat: no-repeat;
    background-size: cover;
    background-image: center;
    background-attachment:fixed;
  }

  .content-box {
    padding: 60px 0 60px 0;
  }
	

  .content-title h3 {
    text-align: center;
    font-color: #41464b;
    font-size: 30px;
    font-weight: 700;
    margin: 0 0 30px 0;
    text-transform: uppercase;
  }

  .content-title-underline {
    width: 30px;
    height: 3px;
    background-color: #ff2e00;
    margin: 0 auto 0 auto;
  }

  .feature-item {
    padding: 20px 0 20px 0;
    cursor: pointer;
    margin-bottom: 20px;
  }

  .feature-item-icon i{
    float: left;
    color: #ff2e00;
    padding: 15px;
    margin-right: 25px;
    width: 75px;
    height: 75px;
    text-align: center;
  }

  .feature-item:hover .feature-item-icon i{
    color: #fff;
    background-color: #ff2e00;
  }

  .feature-item-title h3 {
    color: #41464b;
    text-transform: uppercase;
    font-size: 20px;
    font-weight: 400;
    margin: 0, 0, 10px, 0;
  }

  .feature-item-desc p {
    color: #64707b;
    font-size: 16px;
    font-weight: 300; 
    margin: 0;
    padding-left: 85px;
  }
  #about-bg-diagonal {
    width: 60%;
    height: 700px;
    float: right;
    background-image: url("../assets/img/about-bg-3.jpg");
    border-left: 200px solid #fff;
    border-top: 700px solid transparent;
  }

  #about-content-box {
    float: left;
    height: 700px;
  
  }

  #about-content-box-outer {
    width: 100%;
    height: 100%;
    display: table;
  }

  #about-content-box-inner {
    vertical-align: middle;
    display: table-cell;
  }
  #about .content-title h3 {
    text-align: left;
  }

  #about .content-title-underline {
    margin: 0 0 30px 0;
  }

  .btn-red {
    border-color: #ff2e00;
    color: #ff2e00;
    
  }
  .btn-red:hover {
    background-color: #ff2e00;
    color: #fff;
  }

  #about-desc {
    margin-bottom: 30px;
  }
  #home-cover, #home-heading, #home-btn {
  animation-duration: .5s;
}


#home-cover {
  animation-delay: .1s;
}

#home-heading {
  animation-delay: .5s;
}

#home-btn {
  animation-delay: 1s;
}

</style>