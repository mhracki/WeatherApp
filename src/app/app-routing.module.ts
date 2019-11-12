import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from "./user/user-form/user-form.component";
import { UserListComponent } from './user/user-list/user-list.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { WeatherComponent } from './weather/weather.component';



const routes: Routes = [
  {path:'',redirectTo:'weather',pathMatch:'full'},
  {path:'user',children:[
    {path:'form', component:UserFormComponent},
    {path:'list', component:UserListComponent,canActivate:[AuthGuard],data :{permittedRoles:['Admin']}}

  ]},
  {path:'login',component:LoginComponent},
  {path:'weather',component:WeatherComponent,canActivate:[AuthGuard],data :{permittedRoles:['Admin','User']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
