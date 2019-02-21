export class Usuario {
    _usuario: string;
    _contrasena: string;
    _token: string;
    _tipoId: string;
    _nroId: string;
    _estado: string;
    _fechaNacimiento: string;
    _isRecordarContrasena:boolean = false;


    constructor() {

    }

    getUsuario(): string{
        return this._usuario;
    }

    setUsuario(usuario: string){
        this._usuario = usuario;
    }

    set usuario(usuario: string) {
        this._usuario = usuario;
    }

    set contrasena(contrasena: string) {
        this._contrasena = contrasena;
    }

    set token(token: string) {
        this._token = token;
    }

    set tipoId(tipoId: string) {
        this._tipoId = tipoId;
    }

    set nroId(nroId: string) {
        this._nroId = nroId;
    }

    set estado(estado: string) {
        this._estado = estado;
    }

    set isRecordarContrasena(isRecordar:boolean){
        this._isRecordarContrasena = isRecordar;
    }

    get usuario(): string {
        return this._usuario;
    }
    get contrasena(): string {
        return this._contrasena;
    }
    get token(): string {
        return this._token;;
    }
    get tipoId(): string {
        return this._tipoId;
    }
    get nroId(): string {
        return this._nroId;
    }
    get isRecordarContrasena():boolean{
        return this._isRecordarContrasena;
    }

    get fechaNacimiento(): string {
        return this._fechaNacimiento;
    }

    set fechaNacimiento(nroId: string) {
        this._fechaNacimiento = nroId;
    }

}