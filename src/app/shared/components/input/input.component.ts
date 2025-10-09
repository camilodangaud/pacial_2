import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: false,
})
export class InputComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() model: any;
  @Output() modelChange = new EventEmitter<any>();
  
  @Input() name: string = '';
  @Input() required: boolean = false;
  @Input() floating: boolean = true;

  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  get inputType() {
    if (this.type === 'password') {
      return this.showPassword ? 'text' : 'password';
    }
    return this.type;
  }

  onInputChange(event: any) {
    this.model = event.detail.value;
    this.modelChange.emit(this.model);
  }
}
