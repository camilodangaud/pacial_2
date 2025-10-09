import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: false,
})
export class SelectComponent {
  @Input() label: string = 'Seleccione';
  @Input() placeholder: string = '';
  @Input() labelPlacement: 'start' | 'fixed' | 'stacked' | 'floating' = 'start';
  @Input() options: { label: string; value: any }[] = [];

  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>(); 

  onSelectChange(event: any) {
    this.value = event.detail.value;
    this.valueChange.emit(this.value);
  }
}
