import { Injectable } from '@angular/core';

export enum MENU {
  NONE,
  MAIN,
  MENU_5,
  MENU_6,
  MENU_7,
}
@Injectable()
export class MenuService {
  private _menus = [
    {},
    {
      id: MENU.MAIN,
      links: [
        {
          icon: 'home',
          label: 'Menu 1',
          route: 'lint_to_path',
        },
        {
          icon: 'public',
          label: 'Menu 2',
          route: 'lint_to_path',
        },
        {
          icon: 'transcribe',
          label: 'Menu 3',
          route: 'lint_to_path',
        },
        {
          icon: 'face',
          label: 'Menu 4',
          route: 'lint_to_path',
        },
        {
          icon: 'recycling',
          label: 'Menu 5',
          menuId: MENU.MENU_5,
        },
        {
          icon: 'emoji_people',
          label: 'Menu 6',
          menuId: MENU.MENU_6,
        },
        {
          icon: 'settings_application',
          label: 'Menu 7',
          menuId: MENU.MENU_7,
        },
      ],
    },
    {
      id: MENU.MENU_5,
      root: {
        icon: 'arrow_back_ios',
        label: 'Menu 5',
        menuId: MENU.MAIN,
      },
      links: [
        {
          label: 'Menu 5.1',
          route: 'lint_to_path',
        },
        {
          label: 'Menu 5.2',
          route: 'lint_to_path',
        },
        {
          label: 'Menu 5.3',
          route: 'lint_to_path',
        },
        {
          label: 'Menu 5.4',
          route: 'lint_to_path',
        },
        {
          label: 'Menu 5.5',
          route: 'lint_to_path',
        },
      ],
    },
    {
      id: MENU.MENU_6,
      root: {
        icon: 'arrow_back_ios',
        label: 'Menu 6',
        menuId: MENU.MAIN,
      },
      links: [
        {
          label: 'Menu 6.1',
          route: 'lint_to_path',
        },
        {
          label: 'Menu 6.2',
          route: 'lint_to_path',
        },
        {
          label: 'Menu 6.3',
          route: 'lint_to_path',
        },
        {
          label: 'Menu 6.4',
          route: 'lint_to_path',
        },
        {
          label: 'Menu 6.5',
          route: 'lint_to_path',
        },
      ],
    },
    {
      id: MENU.MENU_7,
      root: {
        icon: 'arrow_back_ios',
        label: 'Menu 7',
        menuId: MENU.MAIN,
      },
      links: [
        {
          label: 'Menu 7.1',
          route: 'lint_to_path',
        },
        {
          label: 'Menu 7.2',
          route: 'lint_to_path',
        },
      ],
    },
  ];

  get menus(): any {
    return this._menus;
  }
}
