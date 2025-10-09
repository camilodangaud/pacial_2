import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/guard.guard';

@NgModule({
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class CoreModule {}