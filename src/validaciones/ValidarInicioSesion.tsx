function ValidarInicioSesion(correo: string, password: string): boolean {
    const adminFicticio = {
        nombre: "Joaquin Andres vargas",
        rut: "2234567-1",
        edad: 35,
        correo: "admin@nutrivida.cl",
        password: "admin2026Nutri",
        rol: "admin"
    };

    const medicoFicticio = {
        nombre: "Carolina fuentes",
        rut: "12345453-1",
        edad: 23,
        correo: "medico@nutrivida.cl",
        password: "medico2026Nutri",
        rol: "medico"
    };

    const buscar = localStorage.getItem("usuarios") || "[]"
    const usuariosValidos = JSON.parse(buscar)

    const lista = [adminFicticio, medicoFicticio, ...usuariosValidos]
    const usuarioEncontrado = lista.find((u) => u.correo === correo && u.password === password)

    if (!usuarioEncontrado) {
        alert("Credenciales Invalidas")
        return false;
    }
    localStorage.setItem("usuarioSesion", JSON.stringify(usuarioEncontrado))
    alert("Logeado exitosamente")
    return true
}
export default ValidarInicioSesion