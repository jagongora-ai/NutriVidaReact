import { Link } from 'react-router-dom'
import TituloPagina from '../components/molecules/TituloPagina'
import type { Patient } from './Pacientes'

function PanelMedico({ pacientes }: { pacientes: Patient[] }) {
    return (
        <div className="container page-space">
            <TituloPagina
                titulo="Panel del Profesional"
                descripcion="Bienvenido al sistema de gestión de pacientes. Selecciona una opción para continuar."
            />
            <div className="row g-4 justify-content-center">
                <div className="col-12 col-md-6 col-lg-5">
                    <article className="home-card card h-100 border-0">
                        <div className="card-body d-flex flex-column p-4 text-center">
                            <h2 className="card-title mb-3">Nueva ficha médica</h2>
                            <p className="card-text mb-4">
                                Ingresa los datos clínicos, antecedentes y plan nutricional de un nuevo paciente.
                            </p>
                            <div className="mt-auto">
                                <Link className="btn btn-primary w-100 py-2" to="/pacientes/nuevo">
                                    Crear ficha de paciente
                                </Link>
                            </div>
                        </div>
                    </article>
                </div>
                <div className="col-12 col-md-6 col-lg-5">
                    <article className="home-card card h-100 border-0">
                        <div className="card-body d-flex flex-column p-4 text-center">
                            <h2 className="card-title mb-3">Consulta de pacientes</h2>
                            <p className="card-text mb-4">
                                Hay {pacientes.length} {pacientes.length === 1 ? 'ficha registrada' : 'fichas registradas'}.
                                Revisa sus datos y seguimiento nutricional.
                            </p>
                            <div className="mt-auto">
                                <Link className="btn btn-primary w-100 py-2" to="/pacientes">
                                    Ver fichas de pacientes
                                </Link>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}

export default PanelMedico
