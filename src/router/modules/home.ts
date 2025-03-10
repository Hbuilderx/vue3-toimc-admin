import LayoutsDefault from '@/layouts/default.vue'
import type { AppRouteRecordRaw } from '../types'
import { t } from '@/hooks/useI18n'

const homeRoutes: Array<AppRouteRecordRaw> = [
  {
    name: 'Home',
    meta: {
      title: t('menu.home'),
      order: 10,
      icon: 'House'
    },
    path: '/',
    component: LayoutsDefault,
    redirect: '/dashboard',
    children: [
      {
        name: 'DashBoard',
        path: '/dashboard',
        component: () => import('@/views/dashboard/welcome/index.vue'),
        meta: {
          title: t('menu.overview')
        }
      }
    ]
  }
]

export default homeRoutes
