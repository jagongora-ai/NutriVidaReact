import AreaInicioSesion from "../components/organisms/AreaInicioSesion";

function InicioSesion() {
    return (

        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <div className="row justify-content-center w-100">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="card shadow border-0 p-4">
                        <AreaInicioSesion />
                    </div>
                </div>
            </div>
        </div>

    )
}
export default InicioSesion;