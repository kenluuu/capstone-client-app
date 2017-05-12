<template>
	<div class="container">
        <div class="row centered-form">
        <div class="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
        	<div class="panel panel-default">
        		<div class="panel-heading">
			    		<h3 class="panel-title">Please sign up for Bootsnipp <small>It's free!</small></h3>
			 			</div>
			 			<div class="panel-body">
			    		<form role="form">
			    			<div class="row">
			    				<div class="col-xs-6 col-sm-6 col-md-6">
			    					<div class="form-group">
			                <input type="text" name="first_name" id="first_name" class="form-control input-sm" placeholder="First Name" v-model="firstName">
			    						{{firstName}}
			    					</div>
			    				</div>
			    				<div class="col-xs-6 col-sm-6 col-md-6">
			    					<div class="form-group">
			    						<input type="text" name="last_name" id="last_name" class="form-control input-sm" placeholder="Last Name" v-model="lastName">
			    					</div>
			    				</div>
			    			</div>

			    			<div class="form-group">
			    				<input type="email" name="email" id="email" class="form-control input-sm" placeholder="Email Address" v-model="email">
			    				{{email}}
			    			</div>

			    			<div class="row">
			    				<div class="col-xs-6 col-sm-6 col-md-6">
			    					<div class="form-group">
			    						<input type="password" name="password" id="password" class="form-control input-sm" placeholder="Password" v-model="password">
			    						{{password}}
			    					</div>
			    				</div>
			    				<div class="col-xs-6 col-sm-6 col-md-6">
			    					<div class="form-group">
			    						<input type="password" name="password_confirmation" id="password_confirmation" class="form-control input-sm" placeholder="Confirm Password">
			    					</div>
			    				</div>
			    			</div>
			    			
			    			<input type="submit" value="Register" class="btn btn-info btn-block" @click="submit">
			    		
			    		</form>
			    	</div>
	    		</div>
    		</div>
    	</div>
    {{fullName}}
    </div>	
</template>

<script type="text/javascript">
	import {serverBus} from '../main'
	export default{
		data() {
			return {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
			};
		},
		computed: {
			fullName() {
				return this.firstName + ' ' + this.lastName;
			}
		},
		methods: {
			submit(e) {
				e.preventDefault();
			  $.ajax({
				  type: "POST",
				  url: 'https://sheltered-taiga-29643.herokuapp.com/api/v1/users.json',
		      headers: {
		      	"Accept": "application/json"
		      	
		      },
				  dataType: 'json',
				  data: {email: this.email, password: this.password, password_confirmation: this.password, name: this.fullName}, 
				  success: function(response) {
				  	
				  	console.log(response);
				  	serverBus.$emit('userInfo', response);

				  },
				  error: function(error) {
				  	alert("invaild email or password");
				  }
				});
			 
			  this.$router.push('/');
			}

		}
	}
		

</script>

<style type="text/css">
	
	.centered-form{
		margin-top: 60px;
	}

	.centered-form .panel{
		background: rgba(255, 255, 255, 0.8);
		box-shadow: rgba(0, 0, 0, 0.3) 20px 20px 20px;
	}
</style>