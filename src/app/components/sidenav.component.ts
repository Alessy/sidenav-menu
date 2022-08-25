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
  selected?: any = undefined;
  // lastSelectedMenu;

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

  selectMenu(menu, menuId) {

    setTimeout(() => {
      let colection = document.getElementsByClassName(
        'mat-list-item'
      ) as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < colection.length; i++) {
        console.log(colection[i]);
        if (colection[i].tabIndex === 0) {
          colection[i].focus();
        }
      }
    }, 600);

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
      }, 10);
    } else if (menu.route && menuId !== undefined) {
      this.menus[1].links.forEach((link) => {
        if (link.menuId === menuId) link.active = true;
        else link.active = false;
      });

      this.isExpanded = false;
      this.isExpandedChange.emit(this.isExpanded);
      setTimeout(() => {
        this.currentMenuId = 1;
      }, 10);
    }
  }
}
