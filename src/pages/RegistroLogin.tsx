import FormularioRegistroLogin from "../components/organisms/FormularioRegistroLogin"

function LoginRegistro() {
    return (
        <div className="container page-space">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="form card">
                        <div className="card-body">
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