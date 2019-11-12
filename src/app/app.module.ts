import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { UserService } from './shared/user.service';
import { UserDataService } from './shared/user-data.service';
import { WeatherComponent } from './weather/weather.component';





@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    UserFormComponent,
    UserListComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(UserDataService, {passThruUnknownUrl: true}),
    ReactiveFormsModule,
    FormsModule,


  ],
  providers: [UserService],
  bootstrap: [AppComponent],
  entryComponents: [UserFormComponent]
})
export class AppModule {}
