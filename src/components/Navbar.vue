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
	    		<p class="navbar-text" id="user-name"> made by {{user.name}} </p>
	    		
	    		<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
	    			<div id="myModal" class="modal fade" role="dialog">
						  <div class="modal-dialog">

						    <!-- Modal content-->
						    <div class="modal-content">
						      <div class="modal-header">
						        <button type="button" class="close" data-dismiss="modal">&times;</button>
						        <h4 class="modal-title">Modal Header</h4>
						      </div>
						      <div class="modal-body">
						        <p>Some text in the modal.</p>
						      </div>
						      <div class="modal-footer">
						        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						      </div>
						    </div>
						  </div>
						</div>
	    	
		   
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

.navbar, .navbar-inverse {
	background-color: white;
}

.navbar-brand h3{
	vertical-align: middle;
}

#room-name {
	margin-left: 400px;
	margin-right: 0px;
}

#user-name{  
	margin-top: 20px;
	margin-right: 40px;
	
}

</style>