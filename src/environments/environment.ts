//import { Environment } from './environment.model';
//let base = ''; //DESARROLLO
let base = 'http://www.ciklos.com.co/ciklos/php/modelo/app/appFrontController.php'
//let base = 'http://cdplin61.intracoomeva.com.co/pruebas/ciklos/php/modelo/app/appFrontController.php'; //PRUEBAS_BASE

let afiliacion  = 'http://cdplin61.intracoomeva.com.co/pruebas/afiliacion/php/modelo/app/appFrontController.php' //PRUEBAS_AFILIACION

let urlForm = "https://forms.office.com/Pages/ResponsePage.aspx?id=Ozy3vcnCgUqvZiNc6sssOJw8aID0RpxLixtPvpULyvVUQThVM1NKNjlZT1hBT1lUUzJBV1c1RDIyRi4u&embed=true";
let apiSite = "6LdVG3sUAAAAAGvp8ECNh0enfcdcwLt5zC-s58rT";
export const ENV = Object.freeze({
    mode: 'Development',
        'APP_NAME': 'Christus Sinergia'
        ,'RUTAS_GENERALES': base
        ,'RUTAS_AFILIACION': afiliacion
        ,'URL_FORM': urlForm
        ,'API_SITE' : apiSite
});
         
