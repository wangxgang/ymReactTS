export default [
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
]