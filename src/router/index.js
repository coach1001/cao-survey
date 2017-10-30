import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SurveyEmpty from '@/components/SurveyEmpty'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/surveys/create',
      name: 'SurveyCreate',
      component: SurveyEmpty
    },
    {
      path: '/surveys/:id',
      name: 'SurveyEdit',
      component: SurveyEmpty,
      props: true
    }
  ]
})
