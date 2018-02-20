import Vue from 'vue'
import Router from 'vue-router'
import Tasks from '@/components/Tasks'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tasks',
      component: Tasks
    }
  ]
})
