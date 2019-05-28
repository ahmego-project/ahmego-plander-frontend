import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import Home from '@/pages/Home'
import ApiTest from '@/pages/ApiTest'
import BeforeSignUp from '@/pages/auth/BeforeSignUp'
import SignUp from '@/pages/auth/SignUp'

Vue.use(Router)

export default new Router({
  mode: 'history', // vue Router에 mode:'history'를 추가하면 url상의 /#/이 없어진다.
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/ApiTest',
      name: 'ApiTest',
      component: ApiTest
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/BeforeSignUp',
      name: 'BeforeSignUp',
      component: BeforeSignUp
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/login'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   if (authRequired && !loggedIn) {
//     return next({
//       path: '/login',
//       query: { returnUrl: to.path }
//     });
//   }

//   next();
// })
