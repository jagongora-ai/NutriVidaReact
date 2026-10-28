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

    const adminAcciones: AccionAdmin[] = [
        {
            titulo: "Gestionar Medicos",
            descripcion: "¡Administre el equipo de clinicaNutrivida!",
            textoBoton: "Gestionar",
            ruta: "/admin/gestion"
        },

        {
            titulo: "Total de equipo medico activos",
            descripcion: "Visualize los medicos activos",
            textoBoton: "Visualizar",
            ruta: "/admin/total"
        }
    ];

    return (
        <div className="row g-4">
            {adminAcciones.map((item) => (
                <div key={item.titulo} className="col-12 col-md-6 col-lg-4" >
                    <CardGestion
                        titulo={item.titulo || ""}
                        descripcion={item.descripcion || ""}
                        textoBoton={item.textoBoton || ""}
                        alHacerClick={() => navegar(item.ruta)}
                    />
                </div>
            )
            )}
        </div>
    )
}
export default Admin