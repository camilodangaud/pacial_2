import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: false,
})
export class ListComponent {
  @Input() items: { icon: string; label: string; action: string }[] = [];
  @Output() itemSelected = new EventEmitter<string>();

  onItemClick(action: string) {
    this.itemSelected.emit(action);
  }
}
