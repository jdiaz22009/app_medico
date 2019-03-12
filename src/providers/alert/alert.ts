import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Platform } from 'ionic-angular';

@Injectable()
export class AlertProvider {
  
  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public platform: Platform) {}

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
  showAlert(titulo: string, content: any, buttons: any, classCss: string) {
    const alert = this.alertCtrl.create({
      title: titulo,
      //subTitle: '',
      message: content,
      cssClass: (classCss != null && classCss != "") ? classCss : "customAlert", 
      buttons: (buttons != null && buttons != "") ? buttons : ['Cerrar'] 
    });
    alert.present();
  }

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
    Descripcion : Función para mostrar alerta
    Autor : Bairon Freire (bairon.freire@iteria.com.co)
    Fecha : 29/10/2018
    ----------------------------------------------------------------------------------
    Historia de Modificaciones
    ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
  ----------------------------------------------------------------------------------*/  
  showAlerta(data) {
    let cssClass: string = (data.classCss != null && data.classCss != "") ? data.classCss : "customAlert";

     if (this.platform.is('android')) {
      cssClass += " customAlertAndroid";
    } 
     let titulo = "";
    if(data.titulo != null && data.titulo != "" && data.titulo == "nothing"){
      titulo = "";
    }else if(data.titulo != null && data.titulo != "" && data.titulo != "nothing"){
      titulo = data.titulo;
    }else{
      titulo = "Advertencia";
    }

    const alert = this.alertCtrl.create({
      title: titulo,
      //subTitle: '',
      message: data.content,
      cssClass: cssClass,
      buttons: (data.buttons != null && data.buttons != "") ? data.buttons : ['Cerrar']
    });
    alert.present();
  }


}
