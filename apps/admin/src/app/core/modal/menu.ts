export interface Menu {
  icon?: string;
  i18n: string;
}


export const menu: { [key: string]: Menu } = {
  '/system': {
    icon: 'setting',
    i18n: 'menu.system',
  },
  '/system/menu': {
    i18n: 'menu.system.menu'
  },
  '/system/user': {
    i18n: 'menu.system.user'
  },
  '/system/authority': {
    i18n: 'menu.system.authority'
  },
  '/system/role': {
    i18n: 'menu.system.role'
  }


};
