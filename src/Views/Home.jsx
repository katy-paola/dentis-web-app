import { useState } from 'react';
import CardCita from '../Components/CardCita';
import { useAuthState } from '../context/authContext';
import useCitas from '../hooks/useCitas';
import useUsuarios from '../hooks/useUsuarios';
import '../styles/Home.css';
import CardPaciente from '../Components/CardPaciente';
import ordenarPorFecha from '../utils/ordenarPorFecha';

const Home = () => {
  const { user } = useAuthState();
  const { data, loading, isError } = useCitas({ cedula: user.cedula });
  const [busqueda, setBusqueda] = useState('');
  const {
    data: usuarios,
    loading: loadingUsuarios,
    isError: isErrorUsuarios
  } = useUsuarios();

  if (isError || isErrorUsuarios) {
    return <div>Tenemos un error en nuestra App</div>;
  }

  return (
    <div className="container mt-3">
      <h1 className="mensaje">
        Bienvenido, <b>{user.nombre}</b> 😻
      </h1>
      {/* Validamos dependiendo al rol, qué se le muetra */}
      {user.rol === 'PACIENTE' && (
        <div className="cita--hoy">
          {loading ? (
            <div>Cargando...</div>
          ) : (
            <div>
              {data.length > 0 ? (
                <>
                  <h2 className="misCitas">Mis citas</h2>
                  <div className="d-flex justify-content-center gap-5 flex-wrap align-items-stretch">
                    {data.sort(ordenarPorFecha).map((cita) => (
                      <div key={cita.id}>
                        <CardCita
                          id={cita.id}
                          motivo={cita.motivo}
                          fecha={new Date(cita.fechaHora).toLocaleString()}
                          estado={cita.estado}
                          solicitud={cita.solicitud}
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <h2>No tienes citas</h2>
              )}
            </div>
          )}
        </div>
      )}

      {user.rol === 'ADMIN' && (
        <h2 className="misCitas">Eres un administrador</h2>
      )}

      {user.rol === 'SECRETARIO' && (
        <div className="mt-5">
          <h2 className="misCitas">Lista de pacientes</h2>
          <div className="input-group mb-3">
            <span className="input-group-text icon-search" id="Busqueda" />
            <input
              type="text"
              className="form-control"
              placeholder="Por nombre o por cédula"
              aria-label="Busqueda"
              aria-describedby="Busqueda"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="mt-3 d-flex flex-wrap gap-5">
            {loadingUsuarios ? (
              <div>Cargando...</div>
            ) : (
              usuarios
                .filter((usuario) => usuario.rol === 'PACIENTE')
                .filter(
                  (usuario) =>
                    usuario.nombre
                      .toLowerCase()
                      .includes(busqueda.toLowerCase()) ||
                    usuario.cedula.includes(busqueda)
                )
                .map((usuario) => (
                  <CardPaciente
                    key={usuario.id}
                    email={usuario.email}
                    nombre={usuario.nombre}
                    cedula={usuario.cedula}
                  />
                ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
