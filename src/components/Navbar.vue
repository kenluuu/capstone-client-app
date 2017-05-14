<template>
	<div>
		<nav class="navbar navbar-inverse">
		  <div class="container-fluid">
		    <div class="navbar-header">
		      <a class="navbar-brand" href="#">Youtube & Chill?</a>
		    	
		    </div>
		    <ul class="nav navbar-nav">
		     
		      <router-link tag="li" active-class="active" to="/"><a>Home</a></router-link>
		    </ul>
		    <ul class="nav navbar-nav navbar-right">
		      <router-link to="/signup" tag='li'><a href="#" v-if="loggedIn"><span class="glyphicon glyphicon-user" ></span> Signup</a></router-link>
		    	<router-link to="/login" tag="li"><a href="#" v-if="loggedIn"><span class="glyphicon glyphicon-user" ></span> Login</a></router-link>
		    	<router-link to="/" tag='li'><a href="#" v-if="!loggedIn"><span class="glyphicon glyphicon-user" ></span> {{user.name}}</a></router-link>
		    	<li><a href="/login" @click="logout" v-if="!loggedIn"><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
		    	
		    </ul>
		  </div>
		</nav>
	
	</div>
</template>

<script type="">
	
	export default {
		data () {
			return {
				user: undefined,
				loggedIn: true
			}
		},
		methods: {
			logout() {
				this.$cookie.delete('user');
				this.loggedIn = true;
				
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

<style type="">
	

</style>