import Vue from 'vue'
import Router from 'vue-router'
import index from "@/page/index/index"
import classify from "@/page/classify/classify"
import banner from "@/page/banner/banner"
import books from "@/page/books/books"
import periodical from "@/page/periodical/periodical"
// import login from "@/page/login"
// import manage from "@/page/manage"
// import listArticle from "@/page/articleList"
// import addArticle from "@/page/addArticle"
// import detail from "@/page/detail"
// import search from "@/page/searcher"
// import error from "@/page/error"
// import album from "@/page/album"
// import message from "@/page/message"
// import imgList from "@/page/imgList"
// import SocialSharing from 'vue-social-sharing';
Vue.use(Router);

// const index = r => require.ensure([], () => r(require('@/page/index')), 'index');
// const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
        children:[{
          path: '/classify',
          component: classify,
          meta: ['分类管理']
        },
        {
          path: '/banner',
          component: banner,
          meta: ['banner图管理']
        },
          {
            path: '/books',
            component: books,
            meta: ['书籍管理']
          },
          {
            path: '/periodical',
            component: periodical,
            meta: ['期刊管理']
          }]
    }
    // {
    //   path: '/classify',
    //   name: 'classify',
    //   component: classify
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: login
    // },
    // {
    //   path: '/manage',
    //   name: 'manage',
    //   component: manage,
    //   children:[{
    //     path: '/listArticle',
    //     component: listArticle,
    //     meta: ['文章列表']
    //
    //   },{
    //     path: '/addArticle',
    //     component: addArticle,
    //     meta: ['添加文章']
    //   }]
    // },
    // {
    //   path: '/detail',
    //   name: 'detail',
    //   component: detail
    // },
    // {
    //   path: '/search',
    //   name: 'search',
    //   component: search
    // },
    // {
    //   path: '/album',
    //   name: 'album',
    //   component: album
    // },
    // {
    //   path: '/message',
    //   name: 'message',
    //   component: message
    // },
    // //图片详情
    // {
    //   path: '/imgList',
    //   name: 'imgList',
    //   component: imgList
    // }
  ],
  // mode:"history"
})
