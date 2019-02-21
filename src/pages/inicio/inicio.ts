import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertProvider: AlertProvider) {
  }

  goToHome() {
    let showLoading = this.alertProvider.showLoadingText();
    showLoading.present();

    setTimeout(() => {
      this.navCtrl.setRoot("HomePage");
      showLoading.dismiss();
    }, 1000);
  }

}
