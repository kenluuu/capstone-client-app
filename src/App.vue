<template>
  <div id= "app-comp">
    
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" 
                 :css="false" appear>
      
     <router-view></router-view>
    </transition>
   
    
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
      user: {},
      load: false
    }
  },
  components: {
    appRoom: Room,
    appNavbar: Navbar,
    appHome: Home
   
  },
  created() {
   
  },
  methods: {
    beforeEnter(el) {
      console.log('beforeEnter');
    },
    enter(el, done) {
      var elem = document.getElementById("progress-bar");   
      var width = 1;
      var round = setInterval(()=> {
        if (width >= 100) {
          clearInterval(round);
          done();
        } else {
          width++;
          elem.style.width = width + '%';
         
        }
      },10);

    },
    afterEnter(el) {
      var width = 0;
      var elem = document.getElementById("progress-bar");  
      elem.style.width = width + '%';
      console.log('afterEnter');
    }
  }
  
}
</script>

<style>
#progress-bar{
  width: 0%;
  height: 2px;
  background-color: red;
  position: absolute;
}
</style>
