import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { RecaptchaModule, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    RecaptchaModule,
    RecaptchaFormsModule,
    IonicPageModule.forChild(LoginPage),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'es', // use French language
    },
    //{ provide: PAGE_SETTINGS, useValue: settings },
  ]
})
export class LoginPageModule { }
