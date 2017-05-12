import Vue from 'vue';
import VueYouTubeEmbed from 'vue-youtube-embed';
import VueResource from 'vue-resource';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes';
import Axios from 'axios';


Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueYouTubeEmbed);





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
