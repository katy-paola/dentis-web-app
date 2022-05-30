import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCitasUsuario } from '../services/citas.services';
import Loading from '../Components/Loading';
import '../styles/viewPaciente.css';
import CardCita from '../Components/CardCita';
import ordenarPorFecha from '../utils/ordenarPorFecha';

const ViewPaciente = () => {
  let { cedula } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(false);

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
              {paciente?.citas.length > 0 ? (
                <>
                  <div className="d-flex justify-content-center gap-5 flex-wrap align-items-stretch">
                    {paciente?.citas.sort(ordenarPorFecha).map((cita) => (
                      <div key={cita.id}>
                        <CardCita
                          motivo={cita.motivo}
                          id={cita.id}
                          fecha={new Date(cita.fechaHora).toLocaleString()}
                          estado={cita.estado}
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <h2>No tienes citas</h2>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPaciente;
