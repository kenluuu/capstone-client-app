<template>
  <div id= "app-comp">
   
    <router-view :user="user"></router-view>
		
  </div>
</template>

<script>
import {serverBus} from './main'
import Navbar from './components/Navbar.vue'
import Room from './components/Room.vue'
import Home from './components/Home.vue'

export default {
  data() {
    return {
      user: {}
    }
  },
  components: {
    appRoom: Room,
    appNavbar: Navbar,
    appHome: Home
   
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
