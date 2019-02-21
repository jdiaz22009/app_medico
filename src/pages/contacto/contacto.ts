import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertController: AlertController, private callNumber: CallNumber) { }

  lineasAtencion: any = [
    {
      id: 1,
      nombre: 'Unidades Integrales en Salud',
      numero: '01 8000 942 029',
    },
    {
      id: 2,
      nombre: 'Unidades de la Red POS',
      numero: '01 8000 934 310',
    }

  ]

  presentConfirm(item) {
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
  }

}
