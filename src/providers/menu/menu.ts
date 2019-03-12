import { Injectable } from '@angular/core';
import { SessionProvider } from '../session/session';
import { ConsultarcitaPage } from '../../pages/consultarcita/consultarcita';
import { SoicitudcitaPage } from '../../pages/soicitudcita/soicitudcita';
import { ContactoPage } from '../../pages/contacto/contacto';

@Injectable()
export class MenuProvider {

  constructor(
    public sessionProvider: SessionProvider
  ) { }

  /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento : getMenuLogOut
    Descripcion : Retorna el menu cuando hay sesión iniciada
    Autor : 
    Fecha : 
   ----------------------------------------------------------------------------------
    Historia de Modificaciones
   ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
   --------------------------------------------------------------------------------*/
  getMenuLogIn() {
    return [
      {
        img: '../../assets/img/iconos/iconos_principales_01.png',
        label: "Agenda tu cita",
        class: "img-solicitud",
        component: SoicitudcitaPage,
        login: false
      },
      {
        img: '../../assets/img/iconos/iconos_principales_02.png',
        label: "Consulta y cancela tu cita",
        class: "img-consulta",
        component: "ConsultarcitaPage",
        login: false
      },
      {
        img: '../../assets/img/iconos/iconos_principales_03.png',
        label: "Contáctanos",
        class: "img-contactos",
        component: "ContactoPage",
        login: false
      }

    ];
  }

  /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento : getMenuLogOut
    Descripcion : Retorna el menu cuando no hay sesión iniciada
    Autor : 
    Fecha : 
   ----------------------------------------------------------------------------------
    Historia de Modificaciones
   ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
   --------------------------------------------------------------------------------*/
  getMenuLogOut() {
    
    return [
      /*{
       img: '../../assets/imgs/MENU_IMG_7.png',
       label: "Promoción y Prevención",
       component: "",
       login: false
      }*/
    ]
  }

  /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento : getMenu
    Descripcion : Retorna el menu segun la el estado de la sesión (true, false)
    Autor :
    Fecha : 
   ----------------------------------------------------------------------------------
    Historia de Modificaciones
   ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
   --------------------------------------------------------------------------------*/
  getMenu(forLogin: boolean) {


    return new Promise((resolve, reject) => {
      let ret = this.getMenuLogOut();
      
      this.sessionProvider.isLogin().then(res => {
        if (res) {
          Array().push.apply(ret, this.getMenuLogIn());

          if (forLogin) {
            ret.push(
              {
                label: "Cerrar Sesión",
                component: "LogOut",
                login: false
              }
            );
          }
        }

      }, error => {
        console.log(error);
      });

      resolve(ret);
    });
  }

}
