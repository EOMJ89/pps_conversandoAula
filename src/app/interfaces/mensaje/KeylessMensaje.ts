export class KeylessMensaje {
    public usuario: string; // Mail del usuario
    public mensaje: string;
    public fecha: number; // Fecha en milisegundos

    constructor(usuario: string, mensaje: string, fecha: number) {
        this.usuario = usuario;
        this.mensaje = mensaje;
        this.fecha = fecha;
    }
    public toJson() {
        return {
            usuario: this.usuario,
            mensaje: this.mensaje,
            fecha: this.fecha
        };
    }
}
