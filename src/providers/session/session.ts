import { Injectable } from '@angular/core';
import { StorageProvider } from '../storage/storage';



@Injectable()
export class SessionProvider {

  constructor(public storage: StorageProvider) {
  }


  /*--------------------------------------------------------------------------------
     Copyright Iteria SAS - Colombia
     Procedimiento: Inicio de sesión de usuario
     Descripcion : Funcion crea la session del usuario
     Autor : Andres Velasco andres.velasco@iteria.com.co
     Fecha : 16/11/2018
     ----------------------------------------------------------------------------------
     Historia de Modificaciones
     ----------------------------------------------------------------------------------
     Fecha Autor Modificacion
     --------------------------------------------------------------------------------*/
  onLogIn(afiliado: any) {
    return new Promise((resolve, reject) => {
      this.storage.guardarEnLocalStorage('us_auth_sinergiaapp', afiliado).then((resp) => {
        resolve(resp);
      }, error => {
        reject(false);
      });
    });
  }

  /*--------------------------------------------------------------------------------
     Copyright Iteria SAS - Colombia
     Procedimiento: Inicio de sesión de usuario
     Descripcion : Funcion valida si un usuario ha iniciado session 
     Autor : Andres Velasco andres.velasco@iteria.com.co
     Fecha : 16/11/2018
     ----------------------------------------------------------------------------------
     Historia de Modificaciones
     ----------------------------------------------------------------------------------
     Fecha Autor Modificacion
     --------------------------------------------------------------------------------*/
  isLogin() {
    return new Promise((resolve, reject) => {
      this.storage.cargarStorage('us_auth_sinergiaapp').then((resp) => {
        if (resp != null && resp != "") {
          resolve(true);
        } else {
          resolve(false);
        }
      }, error => {
        reject(false);
      })
    });
  }

  /*--------------------------------------------------------------------------------
     Copyright Iteria SAS - Colombia
     Procedimiento: Inicio de sesión de usuario
     Descripcion : Funcion elimina la session del usuario
     Autor : Andres Velasco andres.velasco@iteria.com.co
     Fecha : 16/11/2018
     ----------------------------------------------------------------------------------
     Historia de Modificaciones
     ----------------------------------------------------------------------------------
     Fecha Autor Modificacion
     --------------------------------------------------------------------------------*/
  signOut() {
    return new Promise((resolve, reject) => {
      this.storage.eliminarEnLocalStorage('us_auth_sinergiaapp').then((resp) => {
        resolve(resp);
      }, error => {
        reject();
      });
    });
  }



  getInfoUsuario() {
    return new Promise((resolve, reject) => {
      this.storage.cargarStorage('us_auth_sinergiaapp').then((resp) => {
        resolve(resp);
      }, error => {
        reject();
      });
    });
  }
}
