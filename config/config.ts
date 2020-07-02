// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import pageRoutes from './router.config';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  history: { type: 'hash' },  // 默认是 browser。强烈推荐使用默认的 browserHistory。
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  // routers: pageRoutes,
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/myUser',
      component: '../layouts/MyUserLayout',
      routes: [
        {
          name: 'myLogin',
          path: '/myUser/login',
          component: './user/myLogin',
        },
      ],
    },
    {
      path: '/personnel',
      component: '../layouts/MyUserLayout',
      routes: [
        {
          name: 'personnel',
          path: '/personnel',
          component: './Personnel/',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              name: 'list.table-list',
              icon: 'table',
              path: '/list',
              component: './ListTableList',
            },
            {
              path: '/index',
              name: '数据总览',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/component_tree',
              name: '构件检索',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/SpaceManagement',
              name: '空间管理',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/RegularMaintenance',
              name: '定期维保',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/FaultRepair',
              name: '故障报修',
              icon: 'smile',
              component: './Welcome',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
