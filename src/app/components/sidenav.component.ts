import {
  Component,
  OnInit,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { MatNavList } from '@angular/material/list';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'my-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @HostBinding('class')
  elementClass = 'my-sidenav';

  currentMenuId = 1;
  menus;
  lastSelectedMenu;

  @Input() isExpanded: boolean = false;
  @Output() isExpandedChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @ViewChildren('menulist', { read: ElementRef })
  menulist: QueryList<ElementRef>;
  @ViewChildren('mytabgroup') mytabgroup: QueryList<ElementRef>;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.menus = this.menuService.menus;
  }

  selectMenu(menu, menuId, menuNum) {
    // console.log(this.menulist);
    // this.menulist.forEach((div: ElementRef) => console.log(div.nativeElement));
    console.log('menu ' + JSON.stringify(menu));
    console.log('menuId ' + menuId);
    console.log('this.lastSelectedMenu ' + this.lastSelectedMenu);

    if (menuId === 1) {
      console.log('this.lastSelectedMenu save ' + menuNum);
      this.lastSelectedMenu = menuNum;
    }

    // console.log(this.menulist);
    // console.log(this.mytabgroup);
    let element;
    if (menu && menu.menuId) {
      if (menu.menuId === 1) {
        setTimeout(() => {
          element = document.getElementById('menu_' + this.lastSelectedMenu);
          console.log(element);
          element.focus();
        }, 100);
      } else {
        element = this.menulist
          .toArray()
          [menu.menuId].nativeElement.children.item(0);
        setTimeout(() => element.focus(), 100);
      }
    } else if (this.lastSelectedMenu) {
      console.log('hej');
      setTimeout(() => {
        element = document.getElementById('menu_' + this.lastSelectedMenu);
        console.log(element);
        element.focus();
      }, 300);
    }

    if (menu.menuId) {
      this.currentMenuId = menu.menuId;
      if (!this.isExpanded) {
        this.isExpanded = true;
        this.isExpandedChange.emit(this.isExpanded);
      }
    } else if (menu.route && menuId === 1) {
      this.menus[1].links.forEach((link) => (link.active = false));
      menu.active = true;

      this.isExpanded = false;
      this.isExpandedChange.emit(this.isExpanded);
      setTimeout(() => {
        this.currentMenuId = 1;
      }, 100);
    } else if (menu.route && menuId !== undefined) {
      console.log(JSON.stringify(menu) + ' - ' + menuId);
      this.menus[1].links.forEach((link) => {
        if (link.menuId === menuId) link.active = true;
        else link.active = false;
      });

      this.isExpanded = false;
      this.isExpandedChange.emit(this.isExpanded);
      setTimeout(() => {
        this.currentMenuId = 1;
      }, 100);
    }
  }
}
