import { NgZone } from '@angular/core';
import { StorageProvider } from './../../../providers/storage/storage';
import { SessionProvider } from './../../../providers/session/session';
import { AlertProvider } from '../../../providers/alert/alert';
import { Usuario } from '../../../app/core/models/Usuario';
import { MSG_LOGIN } from '../../../config/properties/login.properties';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { GeneralProvider } from '../../../providers/general/general';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilityProvider } from '../../../providers/utility/utility';
import { MSG_RES } from '../../../config/properties/msg-response.properties';
import { Storage } from '@ionic/storage';
import { ENV } from '../../../environments/environment';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export interface FormModel {
  captcha?: string;
}
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  MSG: any;//
  user: Usuario;//declaramos la variable de tipo Usuario
  mensajes: any;
  tipoDoc: any;
  apiSite: string;
  formLogin: FormGroup;
  captcha: string;
  public formModel: FormModel = {};

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , public generalProvider: GeneralProvider
    , public alert: AlertProvider
    , public formBuilder: FormBuilder
    , public session: SessionProvider
    , public storage: StorageProvider
    , private events: Events
    , private storageService: Storage
    , private utilityProvider: UtilityProvider
    , public alertCtrl: AlertController
    , private iap: InAppBrowser
    , private generarProvider: GeneralProvider) {
    this.validarSesion();
    this.storageService.remove("usuario");
    this.createValidations(formBuilder);
    this.getListTipoId(1);
    this.MSG = MSG_LOGIN;
    this.user = new Usuario();
    this.mensajes = new Map();
    this.mensajes.set("800", "El nombre de usuario es invalido");
    this.mensajes.set("1210", "La contraseña es incorrecta");
    this.apiSite = ENV.API_SITE;
  }

  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  validarSesion(){
    this.session.isLogin().then((res: boolean) => {
      if (res) {        
        this.navCtrl.setRoot("HomePage");
      }
    });
  }
  /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento: getListTipoId
    Descripcion : Consulta los tipos de identificación del afiliado
    Autor : 
          : 
    Fecha :
    ----------------------------------------------------------------------------------
    Historia de Modificaciones
    ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
  --------------------------------------------------------------------------------*/
  getListTipoId(intentos: number): void {
    let showLoading = this.utilityProvider.showLoadingText();
    showLoading.present();

    this.generarProvider.getTipoID({
      success: res => {        
        showLoading.dismiss();
        this.tipoDoc = Object.keys(res).map(key => res[key]);
        /*   Object.values(res); */
        /*         this.tipoDoc = res; */
      },
      error: err => {
        showLoading.dismiss();
        if (intentos < 3) {
          this.getListTipoId(intentos + 1);
        } else {
          let data = { content: MSG_RES.get("-1") }
          this.utilityProvider.showAlert(data);
        }
      },
      includeToken: false
    });
  }
  countForm: number = 0;
  /*--------------------------------------------------------------------------------
   Copyright Iteria SAS - Colombia
   Procedimiento: Inicio de sesión de usuario
   Descripcion : 
   Autor : 
   Fecha : 
   ----------------------------------------------------------------------------------
   Historia de Modificaciones
   ----------------------------------------------------------------------------------
   Fecha Autor Modificacion
   --------------------------------------------------------------------------------*/
  onLogin() {
    let showLoading = this.alert.showLoadingText();
    showLoading.present();

    this.generalProvider.login(this.formLogin.value, {
      success: res => {

        if (!res.indConsultaPaci) {

        }

        if (res.length == 0) {
          showLoading.dismiss();
          this.utilityProvider.showAlert({ content: this.homologarMensajes("800", "El nombre de usuario es invalido") });
          return false;
        }

        if (res[0].compararFecha == null && !res[0].indConsultaPaci) {
          showLoading.dismiss();
          this.countForm++;
          if (this.countForm >= 3) {
            this.redirectForm();
            return false;
          }
          this.utilityProvider.showAlert({ content: res[0].mensaje });
          return false;
        }
        this.countForm = 0;

        if (!res[0].compararFecha) {
          showLoading.dismiss();
          this.utilityProvider.showAlert({ content: res[0].mensaje });
          return false;
        }

        this.storageService.set('datosAfiliado', res[0]);
        this.session.onLogIn(res[0]).then(res => {
          this.events.publish('user:onLogIn');
          this.navCtrl.setRoot("HomePage");
        }, err => {
          let data = { content: MSG_RES.get("-1") };
          this.utilityProvider.showAlert(data);
        });
        showLoading.dismiss();
      },
      error: err => {
        showLoading.dismiss();
        let data = { content: MSG_RES.get("-1") }
        this.utilityProvider.showAlert(data);
      },
      includeToken: false
    });
  }

  redirectForm() {
    let alert = this.alertCtrl.create({
      title: 'Información',
      cssClass: "classConfirmacion",
      message: this.MSG.MSG_ERROR_CANTIDAD_INTENTOS,
      buttons: [
        {
          text: 'Cerrar',
          handler: () => {
            this.countForm = 0;
            this.iap.create(ENV.URL_FORM, "_blank");
          }
        }
      ]
    });
    alert.present();
  }


  /*--------------------------------------------------------------------------------
  Copyright Iteria SAS - Colombia
  Procedimiento: Inicio de sesión de usuario
  Descripcion : Función permite homologar los mensajes del ws 
                por los parametrizados.
  Autor : 
  Fecha : 
  ----------------------------------------------------------------------------------
  Historia de Modificaciones
  ----------------------------------------------------------------------------------
  Fecha Autor Modificacion
  --------------------------------------------------------------------------------*/
  private homologarMensajes(code: string, des: string): string {
    let msg = des;
    if (this.mensajes.get(code)) {
      msg = this.mensajes.get(code);
    }
    return msg;
  }

  /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento: Inicio de sesión de usuario
    Descripcion : Función permite crear las validaciones al formulario
                  de inicio de login 
    Autor : 
    Fecha : 
    ----------------------------------------------------------------------------------
    Historia de Modificaciones
    ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
  --------------------------------------------------------------------------------*/
  private createValidations(formBuilder) {
    this.formLogin = formBuilder.group({
      tipoId: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)]],
      nroId: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)]],
      fechaNacimiento: ['', [Validators.required, Validators.required]],
      isRecordarContrasena: [false, []],
      captcha: ['', [Validators.required, Validators.required]],
    });
  }

}
