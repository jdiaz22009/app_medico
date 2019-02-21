import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, AlertController, IonicPage } from 'ionic-angular';
import { StorageProvider } from './../../providers/storage/storage';
import { GeneralProvider } from '../../providers/general/general';
import { AlertProvider } from '../../providers/alert/alert';
import { IonicStepperComponent } from "ionic-stepper";
import { DatePipe } from '@angular/common';
import { MSG_RES } from '../../config/properties/msg-response.properties';
import { UtilityProvider } from '../../providers/utility/utility';
import { SessionProvider } from '../../providers/session/session';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the SoicitudcitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-soicitudcita',
  templateUrl: 'soicitudcita.html',
})
export class SoicitudcitaPage {

  myIndex: number = 0;
  centros: any
  servicios: any = [];
  datosAfiliado: any
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
  nombreCorto: string;
  terminos: boolean = false;
  cupos: any[];
  codCupo: string;
  lineaAtencion: string = '018000934310';
  fechaCorta: string = new Date().toISOString();
  fecha: string = this.fechaCorta;
  minFecha: string = (new Date().getFullYear()).toString();
  maxFecha: string = (new Date().getFullYear() + 5).toString();
  codServicioPediatria = 175;
  urlRofm: string = "https://forms.office.com/Pages/ResponsePage.aspx?id=Ozy3vcnCgUqvZiNc6sssOJw8aID0RpxLixtPvpULyvVUQThVM1NKNjlZT1hBT1lUUzJBV1c1RDIyRi4u&embed=true";
  msg: string = "";
  @ViewChild('stepper') stepper: IonicStepperComponent;

  constructor(
    public navCtrl: NavController,
    public generalProvider: GeneralProvider,
    public alert: AlertProvider,
    public navParams: NavParams,
    public storage: StorageProvider,
    public modalCtrl: ModalController,
    private datePipe: DatePipe,
    public alertCtrl: AlertController,
    private utilityProvider: UtilityProvider,
    private sessionProvider: SessionProvider,
    private iap: InAppBrowser
  ) {
    this.sessionProvider.getInfoUsuario().then((val: any) => {
      this.ips = val.nomIpsAfiliado;
      this.correo = val.Email;
      this.telefono = val.Telefono;
      this.celular = val.Celular;
      this.planes = val.planesBenefi;
      if (val.planesBenefi.length == 1) {
        this.codPlan = val.planesBenefi[0].cod_planb;
      }
      this.codDepto = val.CodDepartamento;
      this.codCiudad = val.CodCiudad;
      this.selectCiudad();
      this.nombreCompleto = val.nombre1 + " " + val.nombre2 + " " + val.apellido1 + " " + val.apellido2;
      this.nombreCorto = val.nombre1 + " " + val.apellido1;
      this.datosAfiliado = val;
    });

  }

  notificacionInicial() {
    this.alert.showAlerta({ content: "Apreciado paciente, los datos que se encuentran con (****) son para proteger tu información personal.  Apreciado paciente, es importante garantizar la actualización de datos personales, le solicitamos amablemente que si la información mostrada a continuacion no es correcta la actualice (correo electrónico, teléfono fijo y celular).", titulo: "Información" });
  }

  selectChange(e) {
    /* console.log(e); */
  }
  ionViewDidLoad() {
    this.getDepto();
    this.notificacionInicial();
  }

  validacionDerechos() {

    let showLoading = this.alert.showLoadingText();
    showLoading.present();

    if (!this.codPlan) {
      showLoading.dismiss();
      this.alert.showAlerta({ content: "El campo plan es obligatorio." });
      return false;
    }

    if (!this.codDepto) {
      showLoading.dismiss();
      this.alert.showAlerta({ content: "El campo departamento es obligatorio." });
      return false;
    }

    if (!this.codCiudad) {
      showLoading.dismiss();
      this.alert.showAlerta({ content: "El campo ciudad es obligatorio." });
      return false;
    }

    let dataJson = {
      "function": "validarDerechosEpsMp",
      "tipoId": this.datosAfiliado.codTipoDocumento,
      "numeroId": this.datosAfiliado.numIdentificacion,
      "codCiudad": this.codCiudad,
      "codPlanBenefi": this.codPlan
    };

    this.generalProvider.webServicesWithUsuario(dataJson, {
      success: data => {

        if (!data) {
          showLoading.dismiss();
          this.alert.showAlerta({ content: "El afiliado no tiene derechos." });
          return false;
        }
        let arrServicio: any = [];
        if (data.indProceso == true) {
          arrServicio = data.servicios;
        } else {
          arrServicio = data;
        }

        if (arrServicio.length == 0 || !arrServicio) {
          showLoading.dismiss();
          this.alert.showAlerta({ content: "El afiliado no tiene derechos." });
          return false;
        }
        if (this.datosAfiliado.edadPaci >= 18) {
          for (let index = 0; index < arrServicio.length; index++) {
            if (arrServicio[index].codigoServicio == this.codServicioPediatria) {
              arrServicio.splice(index, 1);
            }

          }
        }
        this.servicios = arrServicio;
        showLoading.dismiss();
        this.stepper.setStep(2);
      },
      error: err => {
        showLoading.dismiss();
        let data = { content: MSG_RES.get("-1") }
        this.utilityProvider.showAlert(data);
      },
      includeToken: false
    });
  }

  flagOrdenamientos: boolean = false;
  codOrdenamiento: string = "";
  mostrarProcedimiento(data) {
    this.flagOrdenamientos = true;
    let showLoading = this.alert.showLoadingText();
    let alert = this.alertCtrl.create();
    showLoading.present();
    let dataJson = {
      "function": "consultarOrdenesAfiPac",
      "codAfiliado": this.datosAfiliado.codAfiliado,
      "codEspecialidad": data.cod_especialidad,
      "codPlanBenefi": this.codPlan
    };

    this.generalProvider.webServicesWithUsuario(dataJson, {
      success: dataR => {
        if (!dataR.ordenesServicio) {
          showLoading.dismiss();
          this.notificacionNoOrdenamiento();
          //this.alert.showAlerta({ content: "Este servicio no tiene ordenamientos activos." });
          return false;
        }

        alert.setTitle('Ordenamientos');
        for (let index = 0; index < dataR.ordenesServicio.length; index++) {
          let arr: any = {
            type: 'radio',
            label: dataR.ordenesServicio[index].des_procedimiento,
            value: dataR.ordenesServicio[index].cod_ordenamiento
          };
          alert.addInput(arr);
        }


        alert.addButton('Cancelar');
        alert.addButton({
          text: 'Aceptar',
          handler: data => {
            this.codOrdenamiento = data;
          }
        });
        alert.present();
        showLoading.dismiss();
      },
      error: err => {
        showLoading.dismiss();
      },
      includeToken: false
    });



  }

  ind_ordamientos: boolean = false;

  selectServicio() {
    this.ind_ordamientos = false;
    this.centros = [];
    this.codCentro = "";
    const resultado = this.servicios.find(servicio => servicio.codigoServicio == this.codServicio);
    this.centros = resultado.centros;
    if (resultado.ind_requiereOrden == "1") {
      this.ind_ordamientos = true;
      let alert = this.alertCtrl.create({
        title: 'Información',
        cssClass: "classConfirmacion",
        message: 'Este servicio requiere de orden!',
        buttons: [
          {
            text: 'Cerrar',
            role: 'cancel',
            handler: () => {
              this.mostrarProcedimiento(resultado);
            }
          }
        ]
      });
      alert.present();
    }

  }

  notificacionNoOrdenamiento() {
    let alert = this.alertCtrl.create({
      title: 'No hay ordenamientos',
      cssClass: "classConfirmacion",
      message: 'Apreciado paciente, para poder acceder al servicio seleccionado es necesario que cuente con un ordamiento autorizado y vigente, en nuestro sistema no registra autorización a su nombre para este servicio. Le agradecemos comunicarse a la linea ' + this.lineaAtencion + ' para ampliar información al respecto.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }

  anteriorCita() {
    this.pauseTimer();
    let showLoading = this.alert.showLoadingText();
    showLoading.present();
    let data = {
      "function": "registrarTraza",
      "codPaciente": this.datosAfiliado.codPaciente,
      "codAfiliado": this.datosAfiliado.codAfiliado,
      "codPlanBenefi": this.codPlan,
      "datosInfo": JSON.stringify(this.cupos),
      "codProceso": "CWR",
      "desProceso": "si hay cupos cupos disponible, dio click atras",
      "numIdentiAfiPac": this.datosAfiliado.numIdentificacion
    };
    this.generalProvider.webServicesOnlyUsuario(data, {
      success: res => {
        this.liberarCupos();
        showLoading.dismiss();
        this.stepper.setStep(2);
      },
      error: err => {
        showLoading.dismiss();
        let data = { content: MSG_RES.get("-1") }
        this.utilityProvider.showAlert(data);
      },
      includeToken: false
    });
  }

  maxTime: any = 60
  timer: any;
  startTimer() {
    this.timer = setTimeout(x => {
      if (this.maxTime <= 0) { }
      this.maxTime -= 1;
      if (this.maxTime > 0) {
        this.startTimer();
      } else {
        this.excedidoTiepo();
        //this.hidevalue = true;
      }
    }, 1000);
  }

  excedidoTiepo() {
    let showLoading = this.alert.showLoadingText();
    showLoading.present();
    clearInterval(this.timer);
    this.maxTime = 60;
    this.alert.showAlerta({ content: "Se ha excedido el tiempo para seleccionar una cita." });
    this.liberarCupos();
    this.stepper.setStep(2);
    showLoading.dismiss();
  }

  liberarCupos() {
    let showLoading = this.alert.showLoadingText();
    showLoading.present();

    let dataJson = {
      "function": "liberarCupos",
      "codAfiliado": this.datosAfiliado.codAfiliado,
      "codCentro": this.codCentro,
      "codPlanBenefi": this.codPlan
    };

    this.generalProvider.webServicesWithUsuario(dataJson, {
      success: res => {
        console.log(res);
      },
      error: err => {
        showLoading.dismiss();
        let data = { content: MSG_RES.get("-1") }
        this.utilityProvider.showAlert(data);
      },
      includeToken: false
    });
  }

  pauseTimer() { //you can use this function if you want restart timer
    clearInterval(this.timer);
    this.maxTime = 60;
  }

  redirectForm() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      cssClass: "classConfirmacion",
      message: 'Apreciado paciente para poder seguir con el proceso de asignación de cita es necesario que cuente con un ordenamiento autorizado y vigente, en nuestro sistema no registra autorización a su nombre para este servicio',
      buttons: [
        {
          text: 'Cerrar',
          handler: () => {
            this.iap.create(this.urlRofm, "_blank");
          }
        }
      ]
    });
    alert.present();
  }

  cuposDisponibles() {
    let showLoading = this.alert.showLoadingText();
    showLoading.present();

    if (!this.codServicio) {
      showLoading.dismiss();
      this.alert.showAlerta({ content: "El campo servicio es obligatorio." });
      return false;
    }

    if (!this.codCentro) {
      showLoading.dismiss();
      this.alert.showAlerta({ content: "El campo centro es obligatorio." });
      return false;
    }

    if (!this.fechaD) {
      showLoading.dismiss();
      this.alert.showAlerta({ content: "El campo fecha deseada es obligatoria." });
      return false;
    }

    if (!this.jornada) {
      showLoading.dismiss();
      this.alert.showAlerta({ content: "El campo jornada es obligatorio." });
      return false;
    }

    if (this.codOrdenamiento == "" && this.ind_ordamientos == true) {
      this.redirectForm();
      return false;
    }

    const resultado = this.servicios.find(servicio => servicio.codigoServicio == this.codServicio);
    const procedimientos = resultado.procedimiento;
    let dataJson = {
      "function": "consultarCuposDisponibles",
      "codAfiPac": this.datosAfiliado.codAfiliado,
      "codServicio": this.codServicio,
      "codProcedimiento": procedimientos[0].cod_unico,
      "fechaDeseada": this.datePipe.transform(this.fechaD, "dd/MM/yyyy"),
      "jornada": this.jornada,
      "codCentroAtencion": this.codCentro,
      "codPlanBenefi": this.codPlan
    };

    this.cupos = [];

    this.generalProvider.webServicesWithUsuario(dataJson, {
      success: res => {
        showLoading.dismiss();
        this.msg = "";

        if (res.cupos == null || res.cupos.length == 0) {
          this.trazaSinCupo(dataJson);
          this.alert.showAlerta({ content: "No hay cupos disponible." });

        } else {
          this.startTimer();
          this.cupos = res.cupos;
          this.stepper.selectedIndex = 3;

          let flagOne: Boolean = false;
          let flagTwo: Boolean = false;
          let flagThree: Boolean = false;

          let centro = this.centros.find(centro => centro.cod_centro_atenci == this.codCentro);
          let servicio = this.servicios.find(servicio => servicio.codigoServicio == this.codServicio);
          let ciudad = this.ciudades.find(ciudad => ciudad.cod_ciudad == this.codCiudad);

          if ((this.cupos[0].codCentroAtenci != this.codCentro) && (this.fechaD == this.utilityProvider.formatoReverse(this.cupos[0].fecha_cita, "/", "-"))) {
            this.msg = "Apreciado Paciente, en la unidad de atención " + centro.des_razon_social + " no se encontraron citas para el servicio " + servicio.descServicio + ", por lo cual en la siguiente pantalla visualizará las citas disponibles que se encontraron en la ciudad de " + ciudad.nom_ciudad;
          } else
            if ((this.cupos[0].codCentroAtenci != this.codCentro) && (this.fechaD != this.utilityProvider.formatoReverse(this.cupos[0].fecha_cita, "/", "-"))) {
              this.msg = "Apreciado Paciente, en la unidad de atención " + centro.des_razon_social + " no se encontraron citas para el servicio " + servicio.descServicio + ", por lo cual en la siguiente pantalla visualizará las citas disponibles que se encontraron en la ciudad de " + ciudad.nom_ciudad + ", así mismo le informamos que en la fecha " + this.fechaD + " no se encontraron citas por lo cual se mostrará las citas más cercanas a la fecha deseada por usted";
            } else
              if ((this.cupos[0].codCentroAtenci == this.codCentro) && (this.fechaD != this.utilityProvider.formatoReverse(this.cupos[0].fecha_cita, "/", "-"))) {
                this.msg = "Apreciado Paciente, en la fecha " + this.fechaD + " no se encontraron citas por lo cual el sistema le mostrará las citas más cercanas a la fecha deseada por usted";
              }


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

  trazaSinCupo(data) {
    let showLoading = this.alert.showLoadingText();
    showLoading.present();

    let dataJson = {
      "function": "registrarTraza",
      "codPaciente": this.datosAfiliado.codPaciente,
      "codAfiliado": this.datosAfiliado.codAfiliado,
      "codPlanBenefi": this.codPlan,
      "datosInfo": JSON.stringify(data),
      "codProceso": "CWC",
      "desProceso": "No hay cupos disponibles",
      "numIdentiAfiPac": this.datosAfiliado.numIdentificacion
    };

    this.generalProvider.webServicesOnlyUsuario(dataJson, {
      success: res => {
        console.log("traza_log_atras_res");
        console.log(res);
      },
      error: err => {
        showLoading.dismiss();
        let data = { content: MSG_RES.get("-1") }
        this.utilityProvider.showAlert(data);
      },
      includeToken: false
    });
  }

  modalNotificacion(item) {
    /* console.log("validacion de centros"); */
    let servicio = this.servicios.find(servicio => servicio.codigoServicio == this.codServicio);

    let msg = 'Apreciado paciente, está seguro que desea asignar cita de <b>"' + servicio.descServicio + '"</b> para el <b>"' + item.fecha_cita + '"</b> en <b>"' + item.desCentroAtenci + '"</b> con el profesional <b>"' + item.desMedico + '"</b>';
    let alert = this.alertCtrl.create({
      title: 'Confirmación',
      cssClass: "classConfirmacion",
      message: msg,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            /* console.log('Cancel clicked'); */
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.agendarCita(item);
          }
        }
      ]
    });
    alert.present();
  }

  reiniciar() {
    let alert = this.alertCtrl.create({
      title: 'Confirmación',
      message: 'Está seguro que desea reiniciar los pasos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            /* console.log('Cancel clicked'); */
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.stepper.setStep(0);
          }
        }
      ]
    });
    alert.present();
  }

  agendarCita(item) {
    this.pauseTimer();
    let showLoading = this.alert.showLoadingText();
    showLoading.present();
    // const resultado = this.servicios.find(servicio => servicio.codigoServicio == this.codServicio);
    //    const procedimientos = resultado.procedimiento;
    let data = {
      "function": "asignarCita_SNC",
      "codCupo": this.codCupo,
      "decisionServ": "POS",
      "tipoIdentificacion": this.datosAfiliado.codTipoDocumento,
      "numIdentificacion": this.datosAfiliado.numIdentificacion,
      "codPlanBenefi": this.codPlan,
      "correoPac": this.datosAfiliado.Emailenvio,
      "codOrdenamiento": this.codOrdenamiento,
      "codContrato": ""
    };

    this.generalProvider.webServicesWithUsuario(data, {
      success: dataR => {
        let mensaje = dataR.mensaje;
        let arrMensaje = mensaje.split(":");
        if (dataR.indProceso) {
          let dia = this.datePipe.transform(this.fechaD, "dd");
          let mes = this.datePipe.transform(this.fechaD, "MMMM");
          let anio = this.datePipe.transform(this.fechaD, "yyyy");
          showLoading.dismiss();
          let msg = 'El dia <b>' + dia + '</b> del mes de <b>' + mes + '</b> a las <b>' + item.hora_cita + '</b> del año <b>' + anio + '</b> con el profesional <b>' + item.desMedico + '</b> en la unidad básica de atención: <b>' + item.desCentroAtenci + '</b> con dirección <b>' + dataR.cita.dirCentro + '</b> con su cuota moderadora para la atención corresponde a: <b>$' + dataR.cita.vlrCita + '.</br>Al correo <b>' + this.datosAfiliado.Emailenvio + '</b> recibiras el detalle de la información de la cita asignada.';
          let alert = this.alertCtrl.create({
            title: 'Cita Asignada',
            cssClass: "classConfirmacion",
            message: msg,
            buttons: [
              {
                text: 'Cerrar',
                role: 'Cerrar',
                handler: () => {
                  this.stepper.setStep(0);
                }
              }
            ]
          });
          alert.present();
        } else {
          showLoading.dismiss();
          this.trazaErrorGuardar(dataR.mensaje, data);
          this.alert.showAlerta({ content: arrMensaje[1], titulo: "Advertencia" });
        }

        /*         if (arrMensaje[0] == "28") {
              
                } else {
                  showLoading.dismiss();
                  this.trazaErrorGuardar(dataR.mensaje);
                  this.alert.showAlerta({ content: arrMensaje[1], titulo: "Advertencia" });
                } */
      },
      error: err => {
        showLoading.dismiss();
        let data = { content: MSG_RES.get("-1") }
        this.utilityProvider.showAlert(data);
      },
      includeToken: false
    });
  }

  trazaErrorGuardar(msg, dataInfo) {
    let showLoading = this.alert.showLoadingText();
    showLoading.present();
    let data = {
      "function": "registrarTraza",
      "codPaciente": this.datosAfiliado.codPaciente,
      "codAfiliado": this.datosAfiliado.codAfiliado,
      "codPlanBenefi": this.codPlan,
      "datosInfo": JSON.stringify(dataInfo),
      "codProceso": "CWA",
      "desProceso": msg,
      "numIdentiAfiPac": this.datosAfiliado.numIdentificacion
    };

    this.generalProvider.webServicesOnlyUsuario(data, {
      success: dataR => {
        showLoading.dismiss();
        this.stepper.setStep(2);
      },
      error: err => {
        showLoading.dismiss();
        let data = { content: MSG_RES.get("-1") }
        this.utilityProvider.showAlert(data);
      },
      includeToken: false
    });
  }

  actualizarInfo() {
    let showLoading = this.alert.showLoadingText();
    showLoading.present();
    let data: any = {};
    data['codAfiliado'] = this.datosAfiliado.codAfiliado;
    data['function'] = "actualizaInfoAfiSN";


    if (!this.ips) {
      showLoading.dismiss();
      this.alert.showAlerta({ content: "El campo ips es obligatorio." });
      return false;
    }


    if (!this.correo) {
      showLoading.dismiss();
      this.alert.showAlerta({ content: "El campo correo es obligatorio." });
      return false;
    }


    if (!this.telefono) {
      showLoading.dismiss();
      this.alert.showAlerta({ content: "El campo teléfono es obligatorio." });
      return false;
    }


    if (!this.celular) {
      showLoading.dismiss();
      this.alert.showAlerta({ content: "El celular ips es obligatorio." });
      return false;
    }


    if (this.validarCript(this.correo)) {
      data['Email'] = this.correo;
      this.datosAfiliado.Emailenvio = this.correo;
    }

    if (this.validarCript(this.telefono)) {
      data['Telefono'] = this.telefono;
    }

    if (this.validarCript(this.celular)) {
      data['Celular'] = this.celular;
    }

    if (this.terminos == false) {
      showLoading.dismiss();
      this.alert.showAlerta({ content: "Debes aceptar los términos y condiciones." });
      return false;
    }

    this.generalProvider.webServicesWithLogin(data, {
      success: dataR => {
        showLoading.dismiss();
        let mensaje = dataR.mensaje;
        let arrMensaje = mensaje.split(":");
        data = dataR;
        if (data.error == true) {
          this.alert.showAlerta({ content: arrMensaje[1] });
          //alert(data.mensaje);
        } else {
          this.stepper.setStep(1);
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

  aceptaTerminos() {
    if (this.terminos) {
      let contactModal = this.modalCtrl.create(TerminosPage);
      contactModal.present();
    }
  }

  selectCiudad() {
    let showLoading = this.alert.showLoadingText();
    showLoading.present();

    this.ciudades = [];
    let json = {
      "cod_departamento": this.codDepto,
    }
    this.generalProvider.GetCiudad(json, {
      success: res => {
        showLoading.dismiss();
        this.ciudades = res;
      },
      error: err => {
        showLoading.dismiss();
        let data = { content: MSG_RES.get("-1") }
        this.utilityProvider.showAlert(data);
      },
      includeToken: false
    });
  }

  getDepto() {
    let showLoading = this.alert.showLoadingText();
    showLoading.present();

    this.generalProvider.GetDepartamentos({
      success: res => {
        showLoading.dismiss();
        this.departamentos = res;
      },
      error: err => {
        showLoading.dismiss();
        let data = { content: MSG_RES.get("-1") }
        this.utilityProvider.showAlert(data);
      },
      includeToken: false
    });
  }

  validarCript(dato: string) {
    if (dato && dato.search("^[^*]*(\\*[^*]*){4}$") != -1) {
      return false;
    }
    return true;
  }

  goToHome() {
    let showLoading = this.utilityProvider.showLoadingText();
    showLoading.present();

    setTimeout(() => {
      this.navCtrl.setRoot("HomePage");
      showLoading.dismiss();
    }, 1000);
  }
}

@IonicPage()
@Component({
  selector: 'modal-terminos',
  templateUrl: 'terminos.html',
})
export class TerminosPage {

  constructor(public viewCtrl: ViewController) {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
