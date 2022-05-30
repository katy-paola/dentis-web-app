import { useState } from 'react';
import '../styles/cardCita.css';
import { Link } from 'react-router-dom';
import { actualizarCita } from '../services/citas.services';

const CardCita = ({ motivo, fecha, estado, id }) => {
  const [isCancelado, setIsCancelado] = useState(false);

  const cancelarCita = async () => {
    try {
      await actualizarCita({ id, estado: 'CANCELADA' });
      alert('Cita cancelada');
      setIsCancelado(true);
    } catch (error) {
      alert('Error al cancelar la cita');
    }
  };

  const isCanceladoOrCompletado =
    estado === 'CANCELADA' || estado === 'COMPLETADA';

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
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {(!isCanceladoOrCompletado || isCancelado) && (
            <>
              <button
                className="btn btn-outline-danger btn-sm"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                title="Cancelar cita"
                onClick={cancelarCita}
              >
                <span className="icon-bin"></span>
              </button>
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
            </>
          )}
        </div>
      </div>
      <div className="card-footer text-muted">{fecha}</div>
    </div>
  );
};

export default CardCita;
