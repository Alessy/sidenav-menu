import {
  Directive,
  ElementRef,
  Input,
  HostBinding,
  HostListener,
  EventEmitter,
  Output,
} from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';

@Directive({
  selector: '[appNavigableListItem]',
})
export class NavigableListItemDirective implements FocusableOption {
  /** The label which allows the user to jump to the list item by typing */
  @Input('appNavigableListItem')
  label?: string;

  disabled: boolean;

  /** Whether the item is currently selected or not. If it is selected, it will be tabbable */
  @Input('navSelected')
  get selected() {
    return this._selected;
  }
  set selected(newValue: boolean) {
    this._selected = newValue;
    newValue ? (this.tabIndex = 0) : (this.tabIndex = -1);
  }

  // Change name since it's not really two-way bindable.
  /** Emits when an item is selected with mouse or keyboard */
  @Output('navSelection')
  selectedChange = new EventEmitter<void>();

  /**
   * @internal
   * emits when the element is focused -
   * only intended to be used by the container navigable list component.
   */
  @Output()
  focused = new EventEmitter<void>();

  /** @internal */
  @HostBinding('tabindex')
  tabIndex;

  private _selected = false;

  constructor(private element: ElementRef) {}

  @HostListener('focus', ['$event'])
  focusEvent(event: FocusEvent) {
    this.focused.emit();
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  @HostListener('click', ['$event'])
  manage(event: KeyboardEvent) {
    this.selectedChange.emit();
    this.selected = true;
  }

  getLabel(): string {
    return this.label || '';
  }

  /** called by the key manager when this item should become focused */
  focus() {
    (this.element.nativeElement as HTMLElement).focus();
  }
}
