import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';

/*
  Generated class for the UtilityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilityProvider {

  constructor(
    public datePipe: DatePipe,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento: showAlert
    Descripcion : Función para mostrar modal de carga (Loading)
    Autor : Andres Velasco (andres.velasco@iteria.com.co)
    Fecha : 29/10/2018
    ----------------------------------------------------------------------------------
    Historia de Modificaciones
    ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
  ----------------------------------------------------------------------------------*/  
  showLoadingText() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando...',
      duration: 10000
    });
    return loading;
  }  

  /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento: showAlert
    Descripcion : Función para mostrar mensajes de alerta
    Autor : Andres Velasco (andres.velasco@iteria.com.co)
    Fecha : 29/10/2018
    ----------------------------------------------------------------------------------
    Historia de Modificaciones
    ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
  ----------------------------------------------------------------------------------*/
  showAlert(data) { 
    const alert = this.alertCtrl.create({
      title: (data.titulo != null && data.titulo != "") ? data.titulo : "Advertencia",
      //subTitle: '',
      message: data.content,
      cssClass: (data.classCss != null && data.classCss != "") ? data.classCss : "customAlert",
      buttons: (data.buttons != null && data.buttons != "") ? data.buttons : ['Cerrar']
    });
    alert.present();
  }

  /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento : changeDateFormat
    Descripcion : Cambiar el formato de fecha
    Autor : Andres Velasco (andres.velasco@iteria.com.co)
    Fecha : 13/11/2018
   ----------------------------------------------------------------------------------
    Historia de Modificaciones
   ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
   --------------------------------------------------------------------------------*/
  changeDateFormat(fecha: Date, formato: string): string {
    return this.datePipe.transform(fecha, formato, "UTC");
  }

  /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento: presentToast
    Descripcion : Mostrar mensaje en Toast
    Autor : Andres Velasco (andres.velasco@iteria.com.co)
    Fecha : 29/10/2018
    ----------------------------------------------------------------------------------
    Historia de Modificaciones
    ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
  ----------------------------------------------------------------------------------*/
  presentToast(data) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }  

 /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento: presentToast
    Descripcion : Validar fecha menor que la actual dd/mm/yyyy
    Autor : Bairon Freire Velasco (bairon.freire@iteria.com.co)
    Fecha : 24/01/2019
    ----------------------------------------------------------------------------------
    Historia de Modificaciones
    ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
  ----------------------------------------------------------------------------------*/
  menorQueFechaActual(fecha):boolean{
    let fechaActual = new Date(); //yyyy/mm/dd
    let fechaParam = new Date(this.formatoReverse(fecha));
    if(fechaParam < fechaActual){
      return true
    }else{
      return false;
    }
  } 

 /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento: presentToast
    Descripcion : funcion revierte el orden de la fecha dependiendo los split
    ('dd/mm/yyy') split : "/" , split : "/" =  'yyyy/mm/dd'
    Autor : Bairon Freire Velasco (bairon.freire@iteria.com.co)
    Fecha : 24/01/2019
    ----------------------------------------------------------------------------------
    Historia de Modificaciones
    ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
  ----------------------------------------------------------------------------------*/
  formatoReverse(fecha: string, split:string = "/", spitfrom:string = "/") {
    let dateFormat = fecha
      .split(split)
      .reverse()
      .join(spitfrom);
    return dateFormat;
  }

 

}
