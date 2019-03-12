import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { SessionProvider } from './../../providers/session/session';

/**
 * Generated class for the HomeAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-app',
  templateUrl: 'home-app.html',
})
export class HomeAppPage {

  constructor(public alert: AlertProvider, public navCtrl: NavController, public navParams: NavParams, public session: SessionProvider) {
  }

  
  menus: any = [
    {
      urlImagen: '../../assets/img/iconos/icono_home_1.png',
      component: "LoginPage"
    },
    {
      urlImagen: "../../assets/img/iconos/icono_home_5.png",
      component: ""
    },
    {
      urlImagen: "../../assets/img/iconos/icono_home_3.png",
      component: ""
    },
    {
      urlImagen: "../../assets/img/iconos/icono_home_2.png",
      component: ""
    },
    {
      urlImagen: "../../assets/img/iconos/icono_home_4.png",
      component: ""
    }
  ];

  goTo(key){
    if(key.component == ""){
      this.alert.showAlerta({ content: "Esta opción estará disponible próximamente", titulo: "Estimado Usuario" });
      return;
    }else{
      if(key.component == "LoginPage"){
        this.session.isLogin().then((res: boolean) => {
          if (res) {        
            this.navCtrl.setRoot("HomePage");
          }else{
            this.navCtrl.push("LoginPage");
          }
        });
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeAppPage');
  }
  
}
