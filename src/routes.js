import Home from './components/Home.vue';
import Room from './components/Room.vue';
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
export const routes = [
	{path: '/', component: Home },
	{path: '/room', component: Room},
	{path: '/login', component: Login},
	{path: '/signup', component: Signup},
	{path: '*', redirect: '/'}
]