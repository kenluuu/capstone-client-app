<template>
	
    <div class="text-center home">
        <h1>Home {{user}} </h1>
        <h3>Free Bootstrap Themes &amp; Templates</h3>
        <br>
        
        <button class="btn btn-dark btn-lg" @click="createRoom"> Create Room</button>   
    </div>
    
	
</template>

<script type="text/javascript">
  import {serverBus} from '../main';
  export default {
    data() {
      return {
        user: {}
      }
    },
    methods: {
      createRoom() {
        this.$router.push('/room');
        serverBus.$emit('userInfo', this.user);
      }
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
      
      if(Object.getOwnPropertyNames(user).length === 0){
        next('/login');
      }
    } 

  }
</script>

<style type="text/css">
	
	.btn-dark {
    border-radius: 0;
    color: #fff;
    background-color: rgba(0,0,0,0.4);
}
.btn-lg {
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.3333333;
    
}

.home {
    
    background: url(../assets/bg.jpg) no-repeat center center scroll;
    display: table;
    position: relative;
    width: 100%;
    height: 900px;
    
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    -o-background-size: cover;
}


</style>