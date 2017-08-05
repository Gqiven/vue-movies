import Vue from 'vue'
import Router from 'vue-router'
import moment from 'vue-moment'
import axios from 'axios'
// import * as promise from 'es6-promise';
// promise.polyfill();

Vue.use(Router);

var instance = axios.create({
  baseURL: baseUrl,
  xsrfCookieName: 'atl.xsrf.token',
});

var router= new Router({
  	routes: [
	    {
	      path: '/',
	      name: 'homepage',
	      component: function(resolve) {
	        require(['pages/homepage/Index.vue'], resolve);
	      }
	    }
  	]
});

Vue.prototype.axios = instance;

var app = new Vue({
  router
}).$mount('#app')
