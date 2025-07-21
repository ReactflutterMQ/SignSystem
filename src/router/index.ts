import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import _ from 'lodash';
import store from '@/store';
import type { StateAll } from '@/store';
// import { ElMessage } from 'element-plus';

const Login = () => import('@/views/Login/Login.vue');
const Home = () => import('@/views/Home/Home.vue');
const Sign = () => import('@/views/Sign/Sign.vue');
const Exception = () => import('@/views/Exception/Exception.vue');
const Apply = () => import('@/views/Apply/Apply.vue');
const Check = () => import('@/views/Check/Check.vue');

declare module 'vue-router' {
  interface RouteMeta {
    menu?: boolean;
    title?: string;
    icon?: string;
    auth?: boolean;
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/sign',
    meta: {
      menu: true,
      title: '考勤管理',
      icon: 'document-copy',
      auth: true,
    },
    children: [
      {
        path: 'sign',
        name: 'sign',
        component: Sign,
        meta: {
          menu: true,
          title: '在线打卡签到',
          icon: 'calendar',
          auth: true,
        },
        beforeEnter: (to, from, next) => {
          const usersInfos = (store.state as StateAll).users.infos;
          const signsInfos = (store.state as StateAll).signs.infos;

          if (_.isEmpty(signsInfos)) {
            store.dispatch('signs/getTime', { userid: usersInfos._id }).then(res => {
              if (res.data.errcode===0) {
                store.commit('signs/updateInfos', res.data.infos);
                next();
              }
            });
          } else {
            next();
          }
        },
      },
      {
        path: 'exception',
        name: 'exception',
        component: Exception,
        meta: {
          menu: true,
          title: '异常考勤查询',
          icon: 'warning',
          auth: true,
        },
      },
      {
        path: 'apply',
        name: 'apply',
        component: Apply,
        meta: {
          menu: true,
          title: '添加考勤审批',
          icon: 'document-add',
          auth: true,
        },
      },
      {
        path: 'check',
        name: 'check',
        component: Check,
        meta: {
          menu: true,
          title: '我的考勤审批',
          icon: 'finished',
          auth: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  //配置全局路由守卫
  const token = (store.state as StateAll).users.token;
  const infos = (store.state as StateAll).users.infos;
  if (to.meta.auth && _.isEmpty(infos)) {
    //如果需要权限有权限
    if (token) {
      store.dispatch('users/infos').then(res => {
        if (res.data.errcode === 0) {
          store.commit('users/updateInfos', res.data.infos);
          next(); //获取到用户信息后放行
        }
      });
    } else {
      next('/login'); //没token跳转登录页
      // ElMessage.warning('未登录或登陆过期，请重新登录')
    }
  } else {
    //如果没权限
    if (token && to.path === '/login') {
      next('/'); //有token并且想跳转登录页，让其重新回到首页
    } else {
      next();
    }
  }
});

export default router;
