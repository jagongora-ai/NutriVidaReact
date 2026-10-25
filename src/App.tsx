import { Routes, Route } from 'react-router-dom';

import Navbar from './components/organisms/Navbar';
import PiePagina from './components/organisms/PiePagina';

import Profesionales, { profesionalesIniciales } from './pages/Profesionales';
import DetalleProfesional from './pages/DetalleProfesional';
import Inicio from './pages/Inicio';




function App() {


    return (
        <div className="app-shell">
            <Navbar />

            <main className="main-content">
                <Routes>
                    <Route
                        path="/"
                        element={<Inicio />}
                    />

                    <Route
                        path="/profesionales"
                        element={<Profesionales profesionales={profesionalesIniciales} />}
                    />
                    <Route
                        path="/profesionales/:id"
                        element={<DetalleProfesional profesionales={profesionalesIniciales} />}
                    />
                    

                </Routes>
            </main>

            <PiePagina />
        </div>
    );
}

export default App;