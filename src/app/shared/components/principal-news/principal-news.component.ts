import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-principal-news',
  templateUrl: './principal-news.component.html',
  styleUrls: ['./principal-news.component.scss'],
  standalone: false,
})
export class PrincipalNewsComponent {
  @Input() news: { title: string; description: string; image?: string; date?: string }[] = [];
  @Input() limit: number = 4;
}
