<template>
  <div id= "app-comp">
   
    <router-view :user="user"></router-view>
		<button @click="stopvid">Stop</button> <button @click="play"></button>
  </div>
</template>

<script>
import {serverBus} from './main'
import Navbar from './components/Navbar.vue'
import Room from './components/Room.vue'
import Home from './components/Home.vue'
import VueWebcam from 'vue-webcam';
export default {
  data() {
    return {
      user: {}
    }
  },
  components: {
    appRoom: Room,
    appNavbar: Navbar,
    appHome: Home,
    VueWebcam
  },
  created() {
    // serverBus.$on('userInfo',  (data) =>{
    //   console.log(data);
    //   this.user = data;
    // })
  },
  methods: {
   
  }
  
}
</script>

<style>
	
</style>
