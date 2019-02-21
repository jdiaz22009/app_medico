import { Component } from '@angular/core';
import { GeneralProvider } from "../../providers/general/general";
import { Storage } from '@ionic/storage';
import { UtilityProvider } from '../../providers/utility/utility';
import { SessionProvider } from '../../providers/session/session';
import { MSG_RES } from '../../config/properties/msg-response.properties';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { PROPERTIES_TEXT_MSG } from '../../config/properties/consultar-aut.properties';
import { String } from 'typescript-string-operations';
import { SoicitudcitaPage } from '../../pages/soicitudcita/soicitudcita';


/**
 * Generated class for the ConsultarcitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultarcita',
  templateUrl: 'consultarcita.html',
})
export class ConsultarcitaPage {
  MSG: any;
  fechaIni: string;
  fechaFin: string;
  datosAfiliado: any
  datosCitas: any = [];
  citas2: any;
  myIndex: number = 0;
  centros: any
  servicios: any;
  planes: any;
  departamentos: any;
  ciudades: any;
  codDepto: string;
  codCiudad: string;
  codPlan: string;
  codServicio: string;
  codCentro: string;
  jornada: string;
  fechaD: any;
  ips: string;
  correo: string;
  telefono: string;
  celular: string;
  nombreCompleto: string;
  terminos: boolean = false;
  cupos: any;
  codCupo: string;
  datos: any;
  maxFecha: string = (new Date().getFullYear() + 5).toString();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alert: AlertProvider, public generalProvider: GeneralProvider,
    public service: GeneralProvider,
    private sessionProvider: SessionProvider, private utilityProvider: UtilityProvider,
    private storageService: Storage) {
    this.MSG = PROPERTIES_TEXT_MSG;
    this.storageService.get('datosAfiliado').then((val) => {
      this.datosAfiliado = val;
    });
    this.sessionProvider.getInfoUsuario().then((val) => {
      this.datos = val;
      this.init();
    });
  }

  formatMonth(month) {
    if (month < 10) {
      month = '0' + month;
    }
    return month;
  }

  init() {
    let fechActual = new Date();
    fechActual.setMonth(fechActual.getMonth() - 1);
    this.fechaIni = fechActual.getFullYear() + "-" + this.formatMonth((fechActual.getMonth() + 1)) + "-" + fechActual.getDate();
    fechActual.setMonth(fechActual.getMonth() + 9);
    this.fechaFin = fechActual.getFullYear() + "-" + this.formatMonth((fechActual.getMonth() + 1)) + "-" + fechActual.getDate();
    this.consultarCitas(); 
  }

  cancelarCita(cita, index) {
    if(this.validaCanncelarCita(cita)){
      this.confirmCancelaCita(cita, index);
    }
  }

  consultarCitas() {
    let showLoading = this.alert.showLoadingText();
    let fechaIniArr = this.fechaIni.split("-");
    let fechaI = fechaIniArr[2] + "/" + fechaIniArr[1] + "/" + fechaIniArr[0];
    let fechaFinArr = this.fechaFin.split("-");
    let fechaf = fechaFinArr[2] + "/" + fechaFinArr[1] + "/" + fechaFinArr[0];
    showLoading.present();
    let data = {
      "function": "consultarCitasAsignadas",
      "codigoAfiliado": this.datosAfiliado.codAfiliado,
      "codigoPaciente": this.datosAfiliado.codPaciente,
      "fechaInicio": fechaI,
      "fechaFin": fechaf
    };

    this.generalProvider.webServicesNoneUsuario(data, {
      success: dataR => {
        this.datosCitas = [];
        if (dataR.codigoRespuesta == false) {
          let mensaje = dataR.mensaje;
          let arrMensaje = mensaje.split(":");
          this.alert.showAlerta({ content: arrMensaje[1] });
          return false;
        }

        this.datosCitas = dataR;
        showLoading.dismiss();
      },
      error: err => {
        showLoading.dismiss();
        let data = { content: MSG_RES.get("-1") }
        this.utilityProvider.showAlert(data);
      },
      includeToken: false
    });
    showLoading.dismiss();
  }

  private validaCanncelarCita(cita):boolean{
    console.log(cita);
    let flagvalid:boolean = true;
    let fechaCita = cita.fecita;
    let flag = this.utilityProvider.menorQueFechaActual(fechaCita);

    if(flag){
      this.alert.showAlerta({ content: this.MSG.MSN_NO_CANCELAR_CITA });
      flagvalid = false;
    }

    return flagvalid
  }

  private confirmCancelaCita(cita, index){
    let msg = String.Format(this.MSG.MSG_CONFIRM_CANCELAR_CITA, {numero: cita.cod_cita, fecha:cita.fecha_cita, profesional:cita.des_prestador, unidadbasica:cita.des_razon_social});
      this.alert.showAlerta({
         content: msg 
        ,buttons: [
          {
              text: 'Si',
              handler: () => {
                this.accionCancelarCita(cita, index);
              }
          },
          {
              text: 'No',
              handler: () => {

              }
          }
        ]
      });
  }

  public accionCancelarCita(cita, index){
    let codCitaMedica = cita.cod_cita;
    let codCentroAtencion = cita.cod_centro_atenci;
    let codPlanBenefi = cita.ind_benef;

    let showLoading = this.alert.showLoadingText();
    /* let fechaIniArr = this.fechaIni.split("-"); */
    /* let fechaI = fechaIniArr[2] + "/" + fechaIniArr[1] + "/" + fechaIniArr[0]; */
    /* let fechaFinArr = this.fechaFin.split("-"); */
    /* let fechaf = fechaFinArr[2] + "/" + fechaFinArr[1] + "/" + fechaFinArr[0]; */
    showLoading.present();
    let data = {
      "function": "cancelarCitasCW",
      "codCitaMedica": codCitaMedica,
      "codCentroAtencion": codCentroAtencion,
      "codPlanBenefi": codPlanBenefi
    };
    this.generalProvider.webServicesWithUsuario(data, {
      success: dataR => {
        showLoading.dismiss();
        if (dataR.indRespuesta == false) {
          let mensaje = dataR.mensaje;
          if (!mensaje) {
            this.alert.showAlerta({ content: "No se puede realizar la transacción, intentelo más tarde" });
            return false;
          }
          let arrMensaje = mensaje.split(":");
          this.alert.showAlerta({ content: arrMensaje[1] });
          return false;
        } else {
          let msg:string = String.Format(this.MSG.MSG_EXITO_CANCELACION_CITA, {numero: cita.cod_cita})
          this.alert.showAlerta({ 
            content: msg
             ,buttons: [
              {
                  text: 'Si',
                  handler: () => {
                    this.navCtrl.push(SoicitudcitaPage);
                  }
              },
              {
                  text: 'No',
                  handler: () => {
                    this.consultarCitas();
                  }
              }
            ]
           });
          
        }
      },
      error: err => {
        showLoading.dismiss();
        let data = { content: MSG_RES.get("-1") }
        this.utilityProvider.showAlert(data);
      },
      includeToken: false
    });

  }

}
