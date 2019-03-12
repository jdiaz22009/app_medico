import { Usuario } from './../../app/core/models/Usuario';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ENV } from '../../environments/environment';
import { HttpRequestHandler } from '../../app/core/models/http-model';
import { HttpProvider } from '../../shared/http/http';

/*
  Generated class for the GeneralProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI. 
*/
@Injectable()
export class GeneralProvider {

  //Declaración de variables
  private options: any;
  private loginUser: string = "CITASWEB_APP";
  private passUser: string = "Christus_14";
  constructor(
    public http: Http,
    private httpProvider: HttpProvider
  ) {
    this.options = {
      headers: {
        'content-type': 'application/json',
        'access-control-allow-headers': '*',
        'access-control-allow-methods': "PUT, GET, POST, DELETE, OPTIONS",
        'Access-Control-Allow-Origin': '*'
      }
    }
  }

  /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento: Login
    Descripcion : 
    Autor : Bairon Fernando Freire Otalvaro
          : bairon.freire@iteria.com.co
    Fecha : 29/10/2018
   ----------------------------------------------------------------------------------
    Historia de Modificaciones
   ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
   --------------------------------------------------------------------------------*/
  login(usuario: Usuario, httpRequestHandler: HttpRequestHandler) {

    let fechaNew = new Date(usuario.fechaNacimiento);
    //let fecha = this.formatoDatoFecha((fechaNew.getDate() + parseInt("1") )) + "/" + this.formatoDatoFecha(fechaNew.getUTCDate()) + "/" + fechaNew.getUTCFullYear();

    fechaNew.setDate(fechaNew.getDate() + 1)
    let fecha = this.formatoDatoFecha(fechaNew.getDate()) + "/" + this.formatoDatoFecha((fechaNew.getMonth() + parseInt("1") )) + "/" + fechaNew.getUTCFullYear();


    let json = {
      "function": "pacienteAfiliadoSN",
      "codTipoDocumento": usuario.tipoId,
      "numDocumento": usuario.nroId,
      "fechaNacimiento": fecha
    }
    this.httpProvider.post(ENV.RUTAS_GENERALES, json, httpRequestHandler)
  }

  formatoDatoFecha(dato: number) {
    if (dato < 10) {
      return "0" + dato;
    }
    return dato;
  }

  /*--------------------------------------------------------------------------------
   Copyright Iteria SAS - Colombia
   Procedimiento: GetDepartamentos
   Descripcion : funcion que retorna los departamentos obtenidos del servico 
   WS_WebService 
   Autor : Guillen Andres Hoyos Gonzalez
         : guillen.hoyos@iteria.com.co    
   Fecha : 31/10/2018
   ----------------------------------------------------------------------------------
   Historia de Modificaciones
   ----------------------------------------------------------------------------------
   Fecha Autor Modificacion
   --------------------------------------------------------------------------------*/
  public GetDepartamentos(httpRequestHandler: HttpRequestHandler) {
    let json = {
      "function": "departamentoSN"
    }
    this.httpProvider.post(ENV.RUTAS_GENERALES, json, httpRequestHandler)
  }

  /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento: GetCiudad
    Descripcion : funcion que retorna las ciudades obtenidas del servico 
    WS_WebService 
    Autor : Andres Velasco (andres.velasco@iteria.com.co)
    Fecha : 31/10/2018
   ----------------------------------------------------------------------------------
    Historia de Modificaciones
   ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
   --------------------------------------------------------------------------------*/
  public GetCiudad(data: { cod_departamento: string }, httpRequestHandler: HttpRequestHandler) {
    let json = {
      "function": "ciudadesSN",
      "cod_departamento": data.cod_departamento,
    }
    this.httpProvider.post(ENV.RUTAS_GENERALES, json, httpRequestHandler)
  }

  /*--------------------------------------------------------------------------------
     Copyright Iteria SAS - Colombia
     Procedimiento : crear cuenta
     Descripcion : Función consume el servicio web de los 
                   tipos de identificacion del afiliado
     Autor : Bairon Fernando Freire (bairon.freire@iteria.com.co)
     Fecha : 07/11/2018
    ----------------------------------------------------------------------------------
     Historia de Modificaciones
    ----------------------------------------------------------------------------------
     Fecha Autor Modificacion
    --------------------------------------------------------------------------------*/
  getTipoID(httpRequestHandler: HttpRequestHandler) {

    let json = {
      'function': 'tiposIdentificacion'
    }
    this.httpProvider.post(ENV.RUTAS_GENERALES, json, httpRequestHandler);
  }

  webServicesWithLogin(json, httpRequestHandler: HttpRequestHandler) {
    json['Login'] = this.loginUser;
    json['Clave'] = this.passUser;
    console.log(json);
    this.httpProvider.post(ENV.RUTAS_GENERALES, json, httpRequestHandler);
  }

  webServicesWithUsuario(json, httpRequestHandler: HttpRequestHandler) {
    json['usuario'] = this.loginUser;
    json['password'] = this.passUser;
    this.httpProvider.post(ENV.RUTAS_GENERALES, json, httpRequestHandler);
  }

  webServicesOnlyUsuario(json, httpRequestHandler: HttpRequestHandler) {
    json['usuario'] = this.loginUser;
    this.httpProvider.post(ENV.RUTAS_GENERALES, json, httpRequestHandler);
  }

  webServicesNoneUsuario(json, httpRequestHandler: HttpRequestHandler) {
    this.httpProvider.post(ENV.RUTAS_GENERALES, json, httpRequestHandler);
  }

  /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento: fn_GetConsultaCitas
    Descripcion : funcion que retorna las citas asignadas al paciente
    obtenidos del servico  WS_WebService fn_GetConsultaCitas 
    Autor : Guillen Andres Hoyos Gonzalez
          : guillen.hoyos@iteria.com.co    
    Fecha : 31/10/2018
    ----------------------------------------------------------------------------------
    Historia de Modificaciones
    ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
  --------------------------------------------------------------------------------*/
  public fn_GetConsultaCitas(data, httpRequestHandler: HttpRequestHandler) {
    let json = {

      "function": "consultarCitasAsignadas",
      "codigoAfiliado": null,//data.nomIpsAfiliado,
      "codigoPaciente": null,//data.nomIpsAfiliado,
      "fechaInicio": null,//data.nomIpsAfiliado,
      "fechaFin": null//data.nomIpsAfiliado
    }
    this.httpProvider.post(ENV.RUTAS_GENERALES, json, httpRequestHandler)
  }
}
