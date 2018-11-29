import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Topic from '@/components/topic'
import Answer from '@/components/answer'
import Result from '@/components/result'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Topic',
      name: 'Topic',
      component: Topic
    },
    {
      path: '/Answer',
      name: 'Answer',
      component: Answer
    },
    {
      path: '/Result',
      name: 'Result',
      component: Result
    }
  ]
})
