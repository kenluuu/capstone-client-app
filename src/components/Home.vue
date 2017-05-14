<template>
	
    <div class="text-center home">
        <h1>Home {{user}} </h1>
        <h3>Free Bootstrap Themes &amp; Templates</h3>
        <br>
        <router-link :to="{name: 'appRoom', query: {id: user.id}}"  class="btn btn-dark btn-lg">Create Room</router-link>
    </div>
    
	
</template>

<script type="text/javascript">
  import {serverBus} from '../main';
  export default {
    data() {
      return {
        user: undefined
      }
    },
    created() {
      if(this.$cookie.get('user')) {
        this.user = JSON.parse(this.$cookie.get('user'));
        this.loggedIn = false;
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