import AreaInicioSesion from "../components/organisms/AreaInicioSesion";

function InicioSesion() {
    return (
        <div className="w-100 d-flex justify-content-center">
            <div className="col-12 col-sm-8 col-md-6 col-lg-4 px-3">
                <div className="card shadow border-0 p-4">
                    <AreaInicioSesion />
                </div>
            </div>
        </div>
    );
}
export default InicioSesion;