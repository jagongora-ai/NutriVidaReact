export interface UsuarioSesion {
    nombre?: string;
    rut?: string;
    correo?: string;
    rol?: string;
    profesionalId?: number;
    token?: string;
}

export function ObtenerSesion(): UsuarioSesion {
    return JSON.parse(localStorage.getItem("usuarioSesion") || "{}")
}

function ValidarSesion(rol: string): boolean {
    const usuario = ObtenerSesion()

    if (usuario.rol !== rol) {
        return false;
    }
    return true
}
export default ValidarSesion
