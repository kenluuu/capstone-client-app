<template>
	<div>
		<nav class="navbar navbar-default navbar-fixed-top">
		  <div id="progress-bar"></div>
		  <div class="container-fluid">
		    <div class="navbar-header">
		      <a class="navbar-brand" href="/">Youtube & Chill</a>
		    	
		    </div>
		    <ul class="nav navbar-nav">
		     
		      
		     
		    </ul>
		    	
	    		<h3 class="navbar-text" id="room-name">{{roomName}} </h3>	
	    		<p v-if="roomName"class="navbar-text" id="user-name"> made by {{user.name}}  <button  id="invite-btn" class="btn btn-primary" @click="invite">Invite Friends</button></p>
	    		
	    		
	    	
		   
		    <ul class="nav navbar-nav navbar-right">
		      <router-link to="/signup" tag='li'><a href="#" v-if="loggedIn"><span class="glyphicon glyphicon-user" ></span> Signup</a></router-link>
		    	<router-link to="/login" tag="li"><a href="#" v-if="loggedIn"><span class="glyphicon glyphicon-user" ></span> Login</a></router-link>
		    	<li ><a href="/" v-if="!loggedIn"><span class="glyphicon glyphicon-user"></span> {{user.name}}</a></li>
		    	<li id="logout"><a href="/login" @click="logout"v-if="!loggedIn"><span class="glyphicon glyphicon-log-in"></span> Logout </a></li>
		    	
		    </ul>
		  </div>
		</nav>
		
		<!-- <nav class="navbar navbar-default navbar-fixed-top">
			<div id="nav-header" @click="goHome">
				<div id="nav-header-title">
					<h3>Youtube&Chill</h3>
				</div>
			</div>
		 	<div id="nav-login">
		 		<p>Login</p>
		 	</div>
		  
		</nav> -->
	</div>
</template>

<script type="">
	
	export default {
		data () {
			return {
				user: undefined,
				loggedIn: true,
				roomName: this.$route.query.id
			}
		},
		methods: {
			logout() {
				this.$cookie.delete('user');
				this.loggedIn = true;
			},
			goHome() {
				
				window.location.href = '/';
			},
			invite() {
				alertify.alert('Share This Link to invite friends: https://youtube-n-chill.herokuapp.com/room?id=' +this.roomName );

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

<style>
#webcam
.navbar, .navbar-inverse {
	background-color: white;
}

.navbar-brand h3{
	vertical-align: middle;
}

#room-name {
	margin-left: 500px;
	margin-right: 0px;
}

#user-name{  
	margin-top: 15px;
	margin-right: 40px;
	margin-bottom: 10px;
}

#invite-btn {
	padding: 5px;
	margin-left: 100px;
}

</style>