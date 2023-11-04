import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegComponent } from './User/login-reg/login-reg.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'loginreg', component: LoginRegComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
