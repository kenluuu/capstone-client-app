<template>
<div>
  <div id="progress-bar"></div>
   <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"  >
  <div id="progress-bar-load" v-if="load"></div>
  </transition>
  
  <div class="container">
    
    <div class="row">
        <div class="col-sm-6 col-md-4 col-md-offset-4">
            <div class="account-wall">
                <div id="my-tab-content" class="tab-content">
						<div class="tab-pane active" id="login">
               		    <img class="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                    alt="">
               			<form class="form-signin" action="" method="">
               				<input type="text" class="form-control" placeholder="Email" required autofocus v-model='email'> {{email}}
               				<input type="password" class="form-control" placeholder="Password" required v-model="password"> {{password}}
               				<input type="submit" class="btn btn-lg btn-default btn-block" value="Sign In"  @click.once="login">
               			</form>
               			<div id="tabs" data-tabs="tabs">
               				<p class="text-center"><a href="/signup" data-toggle="tab">Need an Account?</a></p>
               				<p class="text-center"><a href="#select" data-toggle="tab">Select Account</a></p>
              				</div>
						</div>
						<div class="tab-pane" id="register">
							<form class="form-signin" action="" method="">
								<input type="text" class="form-control" placeholder="User Name ..." required autofocus>
								<input type="email" class="form-control" placeholder="Emaill Address ..." required>
								<input type="password" class="form-control" placeholder="Password ..." required>
								<input type="submit" class="btn btn-lg btn-default btn-block" value="Sign Up" />
							</form>
							<div id="tabs" data-tabs="tabs">
               			<p class="text-center"><a href="#login" data-toggle="tab">Have an Account?</a></p>
              			</div>
						</div>
						<div class="tab-pane" id="select">
							<div id="tabs" data-tabs="tabs">
								<div class="media account-select">
									<a href="#user1" data-toggle="tab">
										<div class="pull-left">		
											<img class="select-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                    alt="">
										</div>	 
										<div class="media-body">
											<h4 class="select-name">User Name 1</h4>
										</div>
									</a>
								</div>
                                <hr />
								<div class="media account-select">
									<a href="#user2" data-toggle="tab">
										<div class="pull-left">		
											<img class="select-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                    alt="">
										</div>	 
										<div class="media-body">
											<h4 class="select-name">User Name 2</h4>
										</div>
									</a>
								</div>
                                <hr />
               			<p class="text-center"><a href="#login" data-toggle="tab">Back to Login</a></p>
              			</div>
						</div>
						<div class="tab-pane" id="user1">
							<img class="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                    alt="">
							<h3 class="text-center">User Name 1</h3>
							<form class="form-signin" action="" method="">
								<input type="hidden" class="form-control" value="User Name">
								<input type="password" class="form-control" placeholder="Password" autofocus required>
								<input type="submit" class="btn btn-lg btn-default btn-block" value="Sign In" />
							</form>
							<p class="text-center"><a href="#login" data-toggle="tab">Back to Login</a></p>
               		<p class="text-center"><a href="#select" data-toggle="tab">Select another Account</a></p>
						</div>
						<div class="tab-pane" id="user2">
							<img class="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                    alt="">
							<h3 class="text-center">User Name 2</h3>
							<form class="form-signin" action="" method="">
								<input type="hidden" class="form-control" value="User Name">
								<input type="password" class="form-control" placeholder="Password" autofocus required>
								<input type="submit" class="btn btn-lg btn-default btn-block" value="Sign In" />
							</form>
							<p class="text-center"><a href="#login" data-toggle="tab">Back to Login</a></p>
               		<p class="text-center"><a href="#select" data-toggle="tab">Select another Account</a></p>
						</div>
					</div>
            </div>
        </div>
    </div>
	</div>
</div>
</template>

<script type="text/javascript">
  import {serverBus} from '../main';
  export default {
    data() {
      return {
        email: '',
        password: '',
        load: false
      }
    },
    methods: {
      login(e) {
        var vm = this;
        e.preventDefault();
        this.load = true;
        $.ajax({
          type: 'POST',
          url: 'https://sheltered-taiga-29643.herokuapp.com/api/v1/users/login.json',
          data: {
            email: this.email,
            password: this.password
          },
          headers: {"Accept": "application/json"},
          success: function(response) {
            
            vm.$cookie.set('user', JSON.stringify(response), 1);
            var user = vm.$cookie.get('user');
            window.location.href = '/';
          },
          error: function(error) {
            alert('incorrect email or password')
          }
        });
      },
      beforeEnter(el) {
      console.log('beforeEnter');
      },
      enter(el, done) {
        var elem = document.getElementById("progress-bar-load");   
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
        var elem = document.getElementById("progress-bar-load");  
        elem.style.width = width + '%';
        console.log('afterEnter');
      }
    }	
  }

</script>

<style type="text/css">
	body{
    background-color:#f5f5f5;
}
.form-signin
{
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
}
.form-signin .form-control
{
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.form-signin .form-control:focus
{
    z-index: 2;
}
.form-signin input[type="text"]
{
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
.form-signin input[type="password"]
{
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
.account-wall
{
    margin-top: 80px;
    padding: 40px 0px 20px 0px;
    background-color: #ffffff;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16);
}
.login-title
{
    color: #555;
    font-size: 22px;
    font-weight: 400;
    display: block;
}
.profile-img
{
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}
.select-img
{
	border-radius: 50%;
    display: block;
    height: 75px;
    margin: 0 30px 10px;
    width: 75px;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}
.select-name
{
    display: block;
    margin: 30px 10px 10px;
}

.logo-img
{
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}
#progress-bar{
  width: 0%;
  height: 2px;
  background-color: red;
  position: absolute;
  
  float: left;
}
#progress-bar-load{
  width: 35%;
  height: 2px;
  background-color: red;
  position: absolute;
  
  float: left;
}
</style>