import FormularioRegistroLogin from "../components/organisms/FormularioRegistroLogin"

function LoginRegistro() {
    return (
        <div className="container page-space">
            <div className="row justify-content-center w-100">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card-body">
                        <div className="card shadow border-0 p-4">
                            <h2 className="card-title text-center mb-5"> Registro Clinica Nutrivida </h2>
                            <FormularioRegistroLogin />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginRegistro