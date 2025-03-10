import type { IconTypes } from '@/components/Icon/types'
import type { AppRouteRecordRaw } from '@/router/types'

export function useNav() {
  // 给树形菜单添加key
  function genMenuKeys(menus: Array<AppRouteRecordRaw>, level = '0') {
    // 过滤隐藏菜单
    menus = menus.filter((item) => !item.meta?.hideMenu)
    menus.forEach((item, index) => {
      const key = level.indexOf('-') !== -1 ? `${level}${index}` : index + ''
      item.meta = {
        ...item.meta,
        key
      }
      if (item.children) {
        return (item.children = genMenuKeys(item.children, key + '-'))
      }
    })
    return menus
  }

  // 判断是否有子菜单
  function menuHasChildren(menu: AppRouteRecordRaw): boolean {
    return (
      !menu.meta?.hideMenu &&
      !!menu.children &&
      Reflect.has(menu, 'children') &&
      // 判断是否有子菜单，如果只有一个，直接显示父级菜单
      menu.children.length > 0 &&
      // 如果设置alone为true，则必须设置redirect属性
      !menu.meta?.alone
    )
  }

  // 获取菜单key
  function getIndex(item: AppRouteRecordRaw): string {
    return item.meta?.key as string
  }

  // 获取图标
  function getIcons(item) {
    return item.meta?.icon as IconTypes
  }

  return {
    genMenuKeys,
    menuHasChildren,
    getIndex,
    getIcons
  }
}
