import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      redirect: "/moba"
    },
    {
      path: '/main',
      component: () => import('@/views/main'),
      children: [
        {
          path: '',
          redirect: 'home'
        },
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/main/home'),
          meta: {
            auth: true,
            title: '工作平台'
          }
        },
        {
          path: 'add',
          name: 'add',
          component: () => import('@/views/main/add'),
          meta: {
            auth: true,
            title: '添加试听'
          }
        },
      ]
    },
    {
      path: '/moba',
      component: () => import('@/views/moba/index'),
      children: [
        {
          path: '',
          redirect: 'category_list'
        },
        {
          path: 'home', name: 'home', component: () => import('@/views/moba/home'),
        },
        {
          path: 'category_list', name: 'category_list', component: () => import('@/views/moba/category/list'),
        },
        {
          path: 'category_add', name: 'category_add', component: () => import('@/views/moba/category/add'),
        },
        {
          path: 'category_edit/:id', name: 'category_edit', props: true, component: () => import('@/views/moba/category/add'),
        },
        {
          path: 'item_list', name: 'item_list', component: () => import('@/views/moba/item/list'),
        },
        {
          path: 'item_add', name: 'item_add', component: () => import('@/views/moba/item/add'),
        },
        {
          path: 'item_edit/:id', name: 'item_edit', props: true, component: () => import('@/views/moba/item/add'),
        },
        {
          path: 'hero_list', name: 'hero_list', component: () => import('@/views/moba/hero/list'),
        },
        {
          path: 'hero_add', name: 'hero_add', component: () => import('@/views/moba/hero/add'),
        },
        {
          path: 'hero_edit/:id', name: 'hero_edit', props: true, component: () => import('@/views/moba/hero/add'),
        },
        {
          path: 'article_list', name: 'article_list', component: () => import('@/views/moba/article/list'),
        },
        {
          path: 'article_add', name: 'article_add', component: () => import('@/views/moba/article/add'),
        },
        {
          path: 'article_edit/:id', name: 'article_edit', props: true, component: () => import('@/views/moba/article/add'),
        },
        {
          path: 'ads_list', name: 'ads_list', component: () => import('@/views/moba/ads/list'),
        },
        { path: 'ads_edit', name: 'ads_edit', component: () => import('@/views/moba/ads/edit'), },
        {
          path: 'ads_add', name: 'ads_add', component: () => import('@/views/moba/ads/add'),
        },
        {
          path: 'adminuser_list', name: 'adminuser_list', component: () => import('@/views/moba/adminuser/list'),
        },
        {
          path: 'adminuser_edit/:id', name: 'adminuser_edit', props: true, component: () => import('@/views/moba/adminuser/add'),
        },
        {
          path: 'adminuser_add', name: 'adminuser_add', component: () => import('@/views/moba/adminuser/add'),
        },
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login'),
      meta: { noAuth: true , }
    },
    {
      path: '*', meta: { noAuth: true , },
      component: () => import('@/views/404.vue'),
    },
  ]
})
router.beforeEach((to,from,next)=>{
  /* 需要验证的 , token 不存在的 都跳转*/
  if(!to.meta.noAuth  && !localStorage.token ){
    Vue.prototype.$message.error('请先登录')
    return next('/login')
  }
  next()
})
export default router

