import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuProvider } from '../providers/menu/menu';
import { UtilityProvider } from '../providers/utility/utility'
import { SessionProvider } from '../providers/session/session';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: any;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menu: MenuController,
    //public navCtrl: NavController,
    public menuProvider: MenuProvider,
    private sessionProvider: SessionProvider,
    private utilityProvider: UtilityProvider,
    public events: Events
  ) {
    this.initializeApp();
    this.listenToLoginEvents();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.sessionProvider.isLogin().then((res: boolean) => {
        if (res) {
          this.rootPage = "HomePage";
        } else {
          this.rootPage = "LoginPage";
        }
      });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component == "LogOut") {

      //Modal de carga
      let showLoading = this.utilityProvider.showLoadingText();
      showLoading.present();

      this.sessionProvider.signOut().then(res => {
        setTimeout(() => {
          this.nav.setRoot("LoginPage");
          showLoading.dismiss();
        }, 500);
      });

    } else {
      this.nav.setRoot(page.component, { "goToComponent": page.goToComponent });
    }

    //this.navCtrl.push(page);
  }

  /*--------------------------------------------------------------------------------
   Copyright Iteria SAS - Colombia
   Procedimiento: toggleSection
   Descripcion : Desplegar subMenu Nivel 1 
   Autor : Andres Velasco andres.velasco@iteria.com.co
   Fecha : 19/11/2018
   ----------------------------------------------------------------------------------
   Historia de Modificaciones
   ----------------------------------------------------------------------------------
   Fecha Autor Modificacion
   --------------------------------------------------------------------------------*/
  toggleSection(i) {
    this.pages[i].open = !this.pages[i].open;
  }

  /*--------------------------------------------------------------------------------
   Copyright Iteria SAS - Colombia
   Procedimiento: listenToLoginEvents
   Descripcion : Inicializar evento para validar sesion
   Autor : Andres Velasco andres.velasco@iteria.com.co
   Fecha : 19/11/2018
   ----------------------------------------------------------------------------------
   Historia de Modificaciones
   ----------------------------------------------------------------------------------
   Fecha Autor Modificacion
   --------------------------------------------------------------------------------*/
  listenToLoginEvents() {
    this.events.subscribe('user:onLogIn', () => {
      /*    this.pages = [
            { title: 'Inicio', component: HomePage, icon: 'menuicon-home' },
            { title: 'Consultar citas', component: ConsultarcitaPage, icon: 'menuicon-solic-afilia' },
            { title: 'Solicitud de citas', component: SoicitudcitaPage, icon: 'menuicon-red-presta' }
          ];  
          this.enableMenu(true);
    */
      this.menuProvider.getMenu(true).then(res => {
        this.pages = res;
        console.log(this.pages);
      }, error => {
        console.log(error);
      });
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
}
