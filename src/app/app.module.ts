import { NgModule } from '@angular/core';
import {StoreModule} from "@ngrx/store";
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';

import { reducers } from './_stores/reducers';
import { AuthEffects } from './_stores/effects/auth.effects';
import { UserEffects } from './_stores/effects/user.effects';

import { UserService } from './_services/user.service';
import { AuthService } from './_services/authentication.service';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    MapComponent,
    LoginComponent
  ],
  imports: [
    PasswordModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !environment.production,
      autoPause: true
    })
  ],
  providers: [
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
