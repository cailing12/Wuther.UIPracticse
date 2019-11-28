import Layout from '@/Layout/index'
import Login from '@/views/login/index'
const staticRoute = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Layout,
    redirect: '/home/index',
    children: [{
      path: 'index',
      component: () => import('@/views/home/index'),
      name: 'home index',
      meta: {
        title: 'home index',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },
  {
    path: '/permission',
    name: 'permission',
    component: Layout,
    redirect: '/permission/group',
    children: [
      {
        path: 'group',
        component: () => import('@/views/permission/group'),
        name: 'PagePermission',
        meta: {
          title: 'group PagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'department',
        component: () => import('@/views/permission/department'),
        name: 'PagePermission',
        meta: {
          title: 'department Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'roles',
        component: () => import('@/views/permission/roles'),
        name: 'rolesPermission',
        meta: {
          title: 'roles Permission'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  }
]

export default staticRoute
