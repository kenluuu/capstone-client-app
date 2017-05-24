import Vue from 'vue';
import VueYouTubeEmbed from 'vue-youtube-embed';
import VueResource from 'vue-resource';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import VueSocketio from 'vue-socket.io';
import VueChatScroll from 'vue-chat-scroll';


import  VueCookie from 'vue-cookie';
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueYouTubeEmbed);
Vue.use(VueCookie);
Vue.use(VueChatScroll)
;


//use for heroku
Vue.use(VueSocketio, 'https://frozen-chamber-14896.herokuapp.com');



//use 
// Vue.use(VueSocketio, 'localhost:3000');




export const serverBus = new Vue();

const router = new VueRouter({
	routes,
	mode: 'history'
}); 

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
