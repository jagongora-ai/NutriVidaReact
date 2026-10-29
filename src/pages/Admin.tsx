import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CardGestion from "../components/molecules/CardGestion";

type AccionAdmin = {
    titulo :string;
    descripcion : string;
    textoBoton : string;
    ruta : string;
}

function Admin() {
    const navegar = useNavigate()
    useEffect(() => {
        const comprobando = JSON.parse((localStorage.getItem("usuarioSesion")) || "{}")
        if (comprobando.rol != "admin") {
            alert("Usted no tiene permisos para el modo administracion.")
            navegar("/inicioSesion")
        }
    }, []);
3
    const adminAcciones: AccionAdmin[] = [
        {
            titulo: "Gestionar Medicos",
            descripcion: "¡Administre el equipo de clinicaNutrivida!",
            textoBoton: "Gestionar",
            ruta: "/admin/gestion"
        }
    ];

    return (
  <div className="container my-5">
    <div className="text-center mb-4">
      <h1 className="fw-bold">Panel de Administración</h1>
      <p className="text-muted">Seleccione una opción para gestionar la plataforma</p>
    </div>

    <div className="row g-4 justify-content-center">
      {adminAcciones.map((item) => (
        <div key={item.titulo} className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch">
          <CardGestion
            titulo={item.titulo || ""}
            descripcion={item.descripcion || ""}
            textoBoton={item.textoBoton || ""}
            alHacerClick={() => navegar(item.ruta)}
          />
        </div>
      ))}
    </div>
  </div>
);
}
export default Admin