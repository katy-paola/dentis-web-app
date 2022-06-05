import { useState } from 'react';
import '../styles/cardCita.css';
import { Link } from 'react-router-dom';
import { actualizarCita } from '../services/citas.services';
import { useAuthState } from '../context/authContext';

const CardCita = ({ motivo, fecha, estado, id, solicitud }) => {
  const [isCancelado, setIsCancelado] = useState(false);
  const [isCompletado, setIsCompletado] = useState(false);
  const [isSolicitud, setIsSolicitud] = useState(solicitud);

  const { user } = useAuthState();

  /**
   * Es una función que actualiza el estado de una cita a COMPLETADA y luego
   * avisa al usuario de que la cita se ha completado
   */
  const completarCita = async () => {
    try {
      await actualizarCita({
        id,
        estado: 'COMPLETADA',
        solicitud: 'solicitud'
      });
      alert('Cita completada');
      setIsSolicitud('solicitud');
      setIsCompletado(true);
    } catch (error) {
      alert('Error al completar la cita');
    }
  };

  /**
   * Cancela una cita programada.
   */
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

  /**
   * Es una función que toma un parámetro llamado solicitud, y luego establece una variable llamada
   * mensaje a 'cancelación' o 'reprogramación' dependiendo del valor de solicitud.target.id.
   * Luego llama a la función actualizarCita, que se importa del archivo api.js, y le pasa
   * el id de la cita y el valor de mensaje
   */
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
      alert('Error al enviar la solicitud');
    }

    alert(`Solicitud de ${mensaje} enviada`);
  };

  const isSecretario = user.rol === 'SECRETARIO';

  const existeSolicitud =
    isSolicitud === 'cancelación' || isSolicitud === 'reprogramación';

  const isCanceladoOrCompletado =
    estado === 'CANCELADA' || estado === 'COMPLETADA';

  return (
    <div className="card text-center card--size">
      <div
        className={`card-header card--header--${
          isCancelado
            ? 'cancelada'
            : isCompletado
            ? 'completada'
            : estado.toLowerCase()
        }`}
      >
        {isCancelado ? 'CANCELADA' : isCompletado ? 'COMPLETADA' : estado}
        {!isCanceladoOrCompletado && !isCompletado && isSecretario && (
          <button
            type="button"
            className="border-0 button--color"
            onClick={completarCita}
          >
            <span
              className="icon-check-circle"
              title="Marcar cita como completada"
            ></span>
          </button>
        )}
      </div>
      <div className="card-body d-flex flex-column justify-content-between gap-3">
        <h5 className="card-title">{motivo}</h5>
        <p style={{ fontSize: '0.8rem' }}>
          {user.rol === 'PACIENTE'
            ? existeSolicitud && 'Has enviado una solicitud de ' + isSolicitud
            : existeSolicitud &&
              'El paciente ha hecho una solicitud de ' + isSolicitud}
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {!isCanceladoOrCompletado && !isCancelado && !isCompletado && (
            <>
              <button
                className="btn btn-outline-danger btn-sm"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                title="Cancelar cita"
                id="cancelacion"
                onClick={
                  user.rol === 'PACIENTE' ? mensajeSolicitud : cancelarCita
                }
              >
                <span className="icon-bin"></span>
              </button>
              {user.rol === 'PACIENTE' ? (
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
