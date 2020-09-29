import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
		{
			path: '/',
			component: resolve => require(['@/view/start_up/index'], resolve),
			meta: {
				title: '启动页'
			},
		},
	]

const router = new VueRouter({
  routes
})

export default router
