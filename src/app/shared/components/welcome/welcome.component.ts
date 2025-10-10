import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  standalone: false,
})
export class WelcomeComponent {
  @Output() agree = new EventEmitter<void>();

  onAgree() {
    this.agree.emit();
  }
}
