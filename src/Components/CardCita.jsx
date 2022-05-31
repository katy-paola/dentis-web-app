import { useState } from 'react';
import '../styles/cardCita.css';
import { Link } from 'react-router-dom';
import { actualizarCita } from '../services/citas.services';
import { useAuthState } from '../context/authContext';

const CardCita = ({ motivo, fecha, estado, id, solicitud }) => {
  const [isCancelado, setIsCancelado] = useState(false);
  const [isSolicitud, setIsSolicitud] = useState(solicitud);

  const { user } = useAuthState();

  const cancelarCita = async () => {
    try {
      await actualizarCita({ id, estado: 'CANCELADA', solicitud: 'solicitud' });
      alert('Cita cancelada');
      setIsCancelado(true);
      setIsSolicitud('solicitud');
    } catch (error) {
      alert('Error al cancelar la cita');
    }
  };

  const mensajeSolicitud = async (solicitud) => {
    let mensaje;
    try {
      if (solicitud.target.id === 'cancelacion') {
        mensaje = 'cancelación';
        setIsSolicitud(mensaje);
      } else {
        mensaje = 'reprogramación';
        setIsSolicitud(mensaje);
      }

      await actualizarCita({ id, solicitud: mensaje });
    } catch (error) {
      alert('Error al solicitar la cita');
    }

    alert(`Solicitud de ${mensaje} enviada`);
  };

  const existeSolicitud =
    isSolicitud === 'cancelación' || isSolicitud === 'reprogramación';

  const isCanceladoOrCompletado =
    estado === 'CANCELADA' || estado === 'COMPLETADA';

  const isPaciente = user.rol === 'PACIENTE';

  return (
    <div className="card text-center card--size">
      <div
        className={`card-header card--header--${
          isCancelado ? 'cancelada' : estado.toLowerCase()
        }`}
      >
        {isCancelado ? 'CANCELADA' : estado}
      </div>
      <div className="card-body d-flex flex-column justify-content-between gap-3">
        <h5 className="card-title">{motivo}</h5>
        <p style={{ fontSize: '0.8rem' }}>
          {isPaciente
            ? existeSolicitud && 'Has enviado una solicitud de ' + isSolicitud
            : existeSolicitud &&
              'El paciente ha hecho una solicitud de ' + isSolicitud}
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {(!isCanceladoOrCompletado || isCancelado) && (
            <>
              <button
                className="btn btn-outline-danger btn-sm"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                title="Cancelar cita"
                id="cancelacion"
                onClick={isPaciente ? mensajeSolicitud : cancelarCita}
              >
                <span className="icon-bin"></span>
              </button>
              {isPaciente ? (
                <button
                  className="btn btn-outline-warning btn-sm"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-custom-class="custom-tooltip"
                  title="Reprogramar cita"
                  id="reprogramacion"
                  onClick={mensajeSolicitud}
                >
                  <span className="icon-access_alarm"></span>
                </button>
              ) : (
                <Link to={`/reprogramar-cita/${id}`}>
                  <button
                    className="btn btn-outline-warning btn-sm"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-custom-class="custom-tooltip"
                    title="Reprogramar cita"
                  >
                    <span className="icon-access_alarm"></span>
                  </button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
      <div className="card-footer text-muted">{fecha}</div>
    </div>
  );
};

export default CardCita;
