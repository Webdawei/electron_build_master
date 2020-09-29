import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.prototype.$electron = window.require('electron').ipcRenderer

import Qs from 'qs' // qs
Vue.prototype.$qs = Qs; // Qs实例化
import Axios from 'axios' // axios
Vue.prototype.$axios = Axios; // axios实例化

// ELEMENT框架
import ELEMENT from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ELEMENT);

// 弹窗
Vue.prototype.$success = function(msg) {
	this.$message({
		message: msg,
		duration: 2000,
		type: 'success'
	})
}
Vue.prototype.$warning = function(msg) {
	this.$message({
		message: msg,
		duration: 2000,
		type: 'warning'
	})
}
Vue.prototype.$error = function(msg) {
	this.$message({
		message: msg,
		duration: 2000,
		type: 'error'
	})
}
Vue.prototype.$info = function(msg) {
	this.$message({
		message: msg,
		duration: 2000,
		type: 'info'
	})
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
