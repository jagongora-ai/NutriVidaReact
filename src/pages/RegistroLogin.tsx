import FormularioRegistroLogin from "../components/organisms/FormularioRegistroLogin"

function Login() {
    return (
        <div className="container mt-5, fondo-login">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card, cardFormulario">
                        <div className="card-body">
                            <h4 className="card-title text-center mb-5"> Registro Clinica Nutrivida </h4>
                            <FormularioRegistroLogin />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login