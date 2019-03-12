import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

import { CallNumber } from '@ionic-native/call-number';
import { AlertProvider } from '../providers/alert/alert';
import { HttpModule } from '@angular/http';

import { GeneralProvider } from '../providers/general/general';
import { DatePipe } from '@angular/common';
import { UtilityProvider } from '../providers/utility/utility';
import { StorageProvider } from '../providers/storage/storage';
import { IonicStorageModule } from '@ionic/storage';
import { MenuProvider } from '../providers/menu/menu';
import { RecaptchaModule, RECAPTCHA_LANGUAGE  } from 'ng-recaptcha';
import { SessionProvider } from '../providers/session/session';

import { IonicStepperModule, IonicStepComponent } from 'ionic-stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SoicitudcitaPage, TerminosPage } from '../pages/soicitudcita/soicitudcita';
import { HomeAppPage } from '../pages/home-app/home-app';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { HttpProvider } from '../shared/http/http';
import { HTTP } from '@ionic-native/http';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
    MyApp,
    TerminosPage,
    SoicitudcitaPage,
    HomeAppPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RecaptchaModule,
    IonicModule.forRoot(MyApp, {
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthShortNames: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      dayShortNames: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']
    }),
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicStepperModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TerminosPage,
    SoicitudcitaPage,
    HomeAppPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'es', // use French language
    },
    CallNumber,
    GeneralProvider,
    AlertProvider,
    DatePipe,
    UtilityProvider,
    StorageProvider,
    MenuProvider,
    SessionProvider,
    HttpProvider,
    HTTP,
    FileTransfer,
    File,
    IonicStepComponent
  ]
})
export class AppModule { }
