import {
  Directive,
  ContentChildren,
  QueryList,
  AfterContentInit,
  HostListener,
} from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { NavigableListItemDirective } from './navigable-list-item.directive';

@Directive({
  selector: '[appNavigableList]',
})
export class NavigableListDirective implements AfterContentInit {
  keyManager: FocusKeyManager<NavigableListItemDirective>;

  @HostListener('keydown', ['$event'])
  manage(event: KeyboardEvent) {
    this.keyManager.onKeydown(event);
  }

  @ContentChildren(NavigableListItemDirective, { descendants: true })
  listItems: QueryList<NavigableListItemDirective>;

  constructor() {}

  ngAfterContentInit() {
    // typing the first letter of an item will jump to the item. (based on optional label input)
    this.keyManager = new FocusKeyManager<NavigableListItemDirective>(
      this.listItems
    )
      .withWrap()
      .withTypeAhead(300);
    setTimeout(() => {
      this.listItems.first.tabIndex = 0;
    });

    // todo: subscribe to listItems changes
    console.log(this.listItems);
    this.listItems.forEach((item, index) => {
      // TODO: unsub
      item.selectedChange.subscribe((it) => {
        this.keyManager.setActiveItem(index);
        this.listItems.forEach((otherItem, otherIndex) => {
          if (otherIndex != index) {
            otherItem.selected = false;
          }
        });
      });
      item.focused.subscribe((_) => {
        this.keyManager.setActiveItem(index);
      });
    });
  }
}
