import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the ContactoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contacto',
  templateUrl: 'contacto.html',
})
export class ContactoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertController: AlertController, private callNumber: CallNumber, private inAppBrowser: InAppBrowser) { }

  lineasAtencion: any = [
    {
      id: 1,
      nombre: 'Unidades Integrales en Salud',
      numero: '01 8000 942 029',
      icono: 'ios-call',
      type: 1
    },
    {
      id: 2,
      nombre: 'Unidades de la Red POS',
      numero: '01 8000 934 310',
      icono: 'ios-call',
      type: 1
    },
    {
      id: 2,
      nombre: 'Página Web',
      numero: 'https://christussinergia.com/',
      icono: 'globe',
      type: 2
    }

  ]

  presentConfirm(item) {
    if (item.type == 1) {
      let alert = this.alertController.create({
        title: item.nombre,
        message: item.numero,
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              console.log('Cancelar llamada');
            }
          },
          {
            text: 'LLamar',
            handler: () => {
              console.log('Llamando');
              this.callNumber.callNumber(item.numero, true);
            }
          } 
        ]
      });
      alert.present();
    } else if (item.type == 2) {
      this.inAppBrowser.create(item.numero, '_system');
    }
  }

}
