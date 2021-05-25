import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Status from '../views/Status.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/status',
    name: 'Status',
    component: Status,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
