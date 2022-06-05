import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/authContext';
import App from './App';
import Home from './Views/Home';
import Login from './Views/Login';
import Register from './Views/Register';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';
import './styles/icomoon.css';
import RequireAuth from './routes/requireAuth';
import Landing from './Views/Landing';
import AgendarCita from './Views/AgendarCita';
import AgregarSecretario from './Views/AgregarSecretario';
import ReprogramarCita from './Views/ReprogramarCita';
import ViewPaciente from './Views/ViewPaciente';
import ModificarPerfil from './Views/ModificarPerfil';
import VerPerfil from './Views/VerPerfil';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Definimos todas las rutas de la aplicación
root.render(
  <AuthContextProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Landing />} />
          <Route
            path="home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="agendar-cita"
            element={
              <RequireAuth>
                <AgendarCita />
              </RequireAuth>
            }
          />
          <Route
            path="agregar-secretario"
            element={
              <RequireAuth>
                <AgregarSecretario />
              </RequireAuth>
            }
          />
          <Route
            path="reprogramar-cita/:id"
            element={
              <RequireAuth>
                <ReprogramarCita />
              </RequireAuth>
            }
          />

          <Route
            path="view-paciente/:cedula"
            element={
              <RequireAuth>
                <ViewPaciente />
              </RequireAuth>
            }
          />
          <Route
            path="modificar-perfil"
            element={
              <RequireAuth>
                <ModificarPerfil />
              </RequireAuth>
            }
          />
          <Route
            path="mi-perfil"
            element={
              <RequireAuth>
                <VerPerfil />
              </RequireAuth>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Register />} />
          <Route
            path="*"
            element={
              <div>
                <img
                  src="/images/404.png"
                  width={'40%'}
                  height={'auto'}
                  className="rounded mx-auto d-block"
                  alt="404"
                />
              </div>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  </AuthContextProvider>
);
