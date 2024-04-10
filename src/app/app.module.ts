import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordValidationDirective } from './services/password-validation.directive';
import { RegistrationComponent } from './registration/registration.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service'
import { ConfigService } from './services/config.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { APP_BASE_HREF } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PasswordValidationDirective,
    RegistrationComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule

  ],

  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: APP_BASE_HREF, useValue: '/' },
    ConfigService, AuthService, provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
