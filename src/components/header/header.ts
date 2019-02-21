import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UtilityProvider } from '../../providers/utility/utility';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  text: string;
  @Input('title') title;

  constructor(private utilityProvider: UtilityProvider, public navCtrl: NavController) { }

  goToHome() {
    let showLoading = this.utilityProvider.showLoadingText();
    showLoading.present();

    setTimeout(() => {
      this.navCtrl.setRoot("HomePage");
      showLoading.dismiss();
    }, 1000);
  }
}
