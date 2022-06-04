import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCitasUsuario } from '../services/citas.services';
import Loading from '../Components/Loading';
import '../styles/viewPaciente.css';
import CardCita from '../Components/CardCita';
import ordenarPorFecha from '../utils/ordenarPorFecha';
import compararFechas from '../utils/compararFechas';

const ViewPaciente = () => {
  let { cedula } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await getCitasUsuario(cedula);
      setPaciente(response.data);
      setLoading(false);
    };
    getData();
  }, [cedula]);

  return (
    <div className="my-5">
      {loading ? (
        <Loading />
      ) : (
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4 card--paciente">
                <div className="card-body text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: 150 }}
                  />
                  <h5 className="my-3">{paciente?.nombre}</h5>
                  <p className="text-muted mb-1">{paciente?.rol}</p>
                  <p className="text-muted mb-1">{paciente?.email}</p>
                  <p className="text-muted mb-1">CC: {paciente?.cedula}</p>
                  <p className="text-muted mb-4">{paciente?.telefono}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <a
                      href={`tel:${paciente?.telefono}`}
                      type="button"
                      className="btn btn-success btn-sm"
                    >
                      Llamar
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="input-group mb-5">
                <span
                  className="input-group-text icon-search"
                  id="Busqueda"
                ></span>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Por nombre o por cédula"
                  aria-label="Busqueda"
                  aria-describedby="Busqueda"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => setBusqueda('')}
                >
                  Borrar búsqueda
                </button>
              </div>
              {paciente?.citas.length > 0 ? (
                <>
                  <div className="d-flex justify-content-center gap-5 flex-wrap align-items-stretch">
                    {paciente?.citas
                      .filter((cita) => {
                        if (busqueda === '') return true;
                        return compararFechas(cita.fechaHora, busqueda);
                      })
                      .sort(ordenarPorFecha)
                      .map((cita) => (
                        <div key={cita.id}>
                          <CardCita
                            motivo={cita.motivo}
                            id={cita.id}
                            fecha={new Date(cita.fechaHora).toLocaleString()}
                            estado={cita.estado}
                            solicitud={cita.solicitud}
                          />
                        </div>
                      ))}
                  </div>
                </>
              ) : (
                <h2>No tiene citas registradas</h2>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPaciente;
