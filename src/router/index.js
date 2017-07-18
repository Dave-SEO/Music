import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import Search from 'components/search/search'
import Rank from 'components/rank/rank'
import singerdetail from 'components/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      children: [
        {
          path: ':id',
          component: singerdetail
        }
      ],
      component: Singer
    }, {
      path: '/search',
      component: Search
    },
    {
      path: 'rank',
      component: Rank
    }
  ]
})
