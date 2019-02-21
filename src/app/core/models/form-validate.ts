import { FormControl } from '@angular/forms';


export class FormValidator {

  /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento : isDocNoValid
    Descripcion : Valida que el documento (Cédula) sera valido
    Autor : Andres Velasco (andres.velasco@iteria.com.co)
    Fecha : 02/11/2018
   ----------------------------------------------------------------------------------
    Historia de Modificaciones
   ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
   --------------------------------------------------------------------------------*/  
  static isDocNoValid(control: FormControl): any {
    let docFormat = /^[0-9]+$/;

    if (docFormat.test(control.value)) {
      // Valid doc no

      // console.log("Valid doc no");

      return null;
    }

    if (control.value) {
      // Value present, but invalid

      // console.log("Invalid doc number");

      return { "1": true };
    } else {
      // No value is present, invalid

      // console.log("doc number field empty");

      return { "2": true };
    }
  }

  /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento : isAddressValid
    Descripcion : Valida que la dirección (recidencia) sera valido
    Autor : Andres Velasco (andres.velasco@iteria.com.co)
    Fecha : 02/11/2018
   ----------------------------------------------------------------------------------
    Historia de Modificaciones
   ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
   --------------------------------------------------------------------------------*/  
  static isAddressValid(control: FormControl, existingAddress: string) {
    if (control.value == existingAddress || control.value) {
      // Valid address

      // console.log("Valid address");

      return null
    } else {
      // No value is present, invalid

      return { "1": true };
    }
  }

  /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento : isPhoneContactNoValid
    Descripcion : Valida que el número teléfono sera valido
    Autor : Andres Velasco (andres.velasco@iteria.com.co)
    Fecha : 02/11/2018
   ----------------------------------------------------------------------------------
    Historia de Modificaciones
   ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
   --------------------------------------------------------------------------------*/  
  static isPhoneContactNoValid(control: FormControl, existingContactNo: string, strictValidate: boolean, ignoreValidation: boolean): any {
    let contactFormat = /^[0-9]{1,11}$/;

    if ((control.value == existingContactNo && !strictValidate)
      || contactFormat.test(control.value)
      || (ignoreValidation && !strictValidate)) {
      // Valid contact number

      // console.log("Valid contact number");

      return null
    }

    if (control.value) {
      // Value present, but invalid

      // console.log("Invalid contact number");

      return { "1": true };
    } else {
      // No value is present, invalid

      // console.log("contact field empty");

      return { "2": true };
    }
  }

  /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento : isCellContactNoValid
    Descripcion : Valida que el número celular sera valido
    Autor : Andres Velasco (andres.velasco@iteria.com.co)
    Fecha : 02/11/2018
   ----------------------------------------------------------------------------------
    Historia de Modificaciones
   ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
   --------------------------------------------------------------------------------*/  
  static isCellContactNoValid(control: FormControl, existingContactNo: string, strictValidate: boolean, ignoreValidation: boolean): any {
    let contactFormat = /^[0-9]{1,10}$/;

    if ((control.value == existingContactNo && !strictValidate)
      || contactFormat.test(control.value)
      || (ignoreValidation && !strictValidate)) {
      // Valid contact number

      // console.log("Valid contact number");

      return null
    }

    if (control.value) {
      // Value present, but invalid

      // console.log("Invalid contact number");

      return { "1": true };
    } else {
      // No value is present, invalid

      // console.log("contact field empty");

      return { "2": true };
    }
  }

  /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento : isEmailValid
    Descripcion : Valida que el email sera valido
    Autor : Andres Velasco (andres.velasco@iteria.com.co)
    Fecha : 02/11/2018
   ----------------------------------------------------------------------------------
    Historia de Modificaciones
   ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
   --------------------------------------------------------------------------------*/ 
  static isEmailValid(control: FormControl, existingEmail: string, strictValidate: boolean): any {
    let emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if ((control.value == existingEmail && !strictValidate) || emailFormat.test(control.value)) {
      // Valid email

      // console.log("Valid email");

      return null
    }

    if (control.value) {
      // Value present, but invalid

      // console.log("Invalid email");

      return { "1": true };
    } else {
      // No value is present, invalid

      // console.log("Email field empty");

      return { "2": true };
    }
  }

  /*--------------------------------------------------------------------------------
    Copyright Iteria SAS - Colombia
    Procedimiento : ifFieldEmpty
    Descripcion : Valida que el campo no este vacio
    Autor : Andres Velasco (andres.velasco@iteria.com.co)
    Fecha : 02/11/2018
   ----------------------------------------------------------------------------------
    Historia de Modificaciones
   ----------------------------------------------------------------------------------
    Fecha Autor Modificacion
   --------------------------------------------------------------------------------*/
  static ifFieldEmpty(control: FormControl, existingValue: string, strictValidate: boolean) {
    if (control.value || existingValue == control.value || !strictValidate) {
      // Valid field value (value is present)

      // console.log("Valid field");

      return null
    } else {
      // No value is present, invalid

      // console.log("field empty");

      return { "1": true };
    }
  }
}
