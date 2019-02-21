import { Usuario } from './../../app/core/models/Usuario';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

    usuario: Usuario;
    credenciales: any;
    constructor(private storage: Storage
        , private plaform: Platform) {
        this.credenciales = new Map();
    }


    setLocalStorage(key, value) {
        this.storage.set(key, value);
    }

    getLocalStorage(key) {
        this.storage.get(key).then((val) => {
            return val;
        });
    }
    /*--------------------------------------------------------------------------------
      Copyright Iteria SAS - Colombia
      Procedimiento: Login
      Descripcion : Metodo consulta la informacion del local storage
      Autor : Andres Velasco andres.velasco@iteria.com.co
      Fecha : 29/10/2018
     ----------------------------------------------------------------------------------
      Historia de Modificaciones
     ----------------------------------------------------------------------------------
      Fecha Autor Modificacion
     --------------------------------------------------------------------------------*/
    cargarStorage(key: string) {
        let promesa = new Promise((resolve, reject) => {
            if (this.plaform.is('cordova')) {
                this.storage.ready()
                    .then(() => {
                        this.storage.get(key).then(value => {

                            resolve(JSON.parse(value));
                        })
                    })
            } else {
                let value = localStorage.getItem(key);
                resolve(JSON.parse(value));
            }
        });

        return promesa;
    }




    /*--------------------------------------------------------------------------------
        Copyright Iteria SAS - Colombia
        Procedimiento: Login
        Descripcion : Metodo guarda informacion en el loca storage
        Autor : Andres Velasco andres.velasco@iteria.com.co
        Fecha : 29/10/2018
       ----------------------------------------------------------------------------------
        Historia de Modificaciones
       ----------------------------------------------------------------------------------
        Fecha Autor Modificacion
       --------------------------------------------------------------------------------*/
    guardarEnLocalStorage(key: string, value: any) {
        return new Promise((resolve, reject) => {
            if (this.plaform.is('cordova')) {
                this.storage.set(key, JSON.stringify(value)).then(() => {
                    resolve(true);
                }, err => {
                    reject(false);
                });
            } else {
                if (value) {
                    localStorage.setItem(key, JSON.stringify(value));
                    resolve(true)
                } else {
                    localStorage.removeItem(key);
                    resolve(false);
                }
            }
        });
    }


    eliminarEnLocalStorage(key: string) {
        return new Promise((resolve, reject) => {
            if (this.plaform.is('cordova')) {
                this.storage.remove(key);
                resolve(true);
            } else {
                if (key) {
                    localStorage.removeItem(key);
                    resolve(true);
                } else {
                    reject(false);
                }
            }
        });
    }




}
