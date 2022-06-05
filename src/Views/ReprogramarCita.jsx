import '../styles/reprogramarCita.css';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCitasByDay, actualizarCita } from '../services/citas.services';
import { useParams } from 'react-router-dom';
import mapHoras from '../utils/mapHoras';

const ReprogramarCita = () => {
  const { id } = useParams();
  const fechaSeleccionada = useRef(null);
  const horaSeleccionada = useRef(null);
  const [horas, setHoras] = useState(mapHoras);
  const navigate = useNavigate();
  const [isFechaSeleccionada, setIsFechaSeleccionada] = useState(false);

  /**
   * Obtiene todas las citas para un día determinado y luego filtra las horas que ya están ocupadas
   */
  const comprobarDisponibilidad = async () => {
    setIsFechaSeleccionada(true);
    const fecha = fechaSeleccionada.current.value;
    const response = await getCitasByDay(fecha);
    const citas = response.data;

    const horasDisponibles = mapHoras.filter(
      (hora) =>
        !citas.some((cita) => {
          if (cita.estado !== 'CANCELADA' && cita.estado !== 'COMPLETADA') {
            return new Date(cita.fechaHora).getHours() === hora.indice;
          }
        })
    );

    setHoras(horasDisponibles);
  };

  /**
   * La función reprogramarCita() es una función asíncrona que toma la fecha y hora seleccionada por el
   * usuario y la convierte en una cadena, luego llama a la función actualizarCita() para actualizar la
   * cita en la base de datos
   */
  const reprogramarCita = async () => {
    const fecha = fechaSeleccionada.current.value;
    const hora = horaSeleccionada.current.value;

    const fechaHora = `${fecha} ${hora}:00:00`;
    const fechaHoraFormato = new Date(fechaHora).toISOString();

    try {
      await actualizarCita({
        id,
        fechaHora: fechaHoraFormato,
        estado: 'REPROGRAMADA',
        solicitud: 'solicitud'
      });
      alert('Cita reprogramada');
      navigate('/home');
    } catch (error) {
      alert('Error al reprogramar la cita');
    }
  };

  return (
    <div className="container d-flex flex-column mb-3 justify-content-center mt-5 mb-5 p-5 agendar--cita">
      <div className="d-flex flex-row justify-content-center align-items-center flex-wrap">
        <div className="p-2">
          <form>
            <div className="mb-4">
              <h2>Reprogramar cita</h2>
            </div>

            <div className="d-flex flex-column mb-3">
              <label className="pb-2" htmlFor="date">
                Horario:
              </label>
              <input
                ref={fechaSeleccionada}
                onChange={comprobarDisponibilidad}
                type="date"
                id="date"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {isFechaSeleccionada && (
              <select
                ref={horaSeleccionada}
                className="form-select"
                aria-label="Default select example"
              >
                {horas.map((hora) => (
                  <option key={hora.indice} value={hora.indice}>
                    {hora.value}
                  </option>
                ))}
              </select>
            )}
          </form>
        </div>
        <div className="p-2 img--agenda">
          <img
            src="../images/reprogramar-cita.png"
            className="img-fluid img--reprogramar-cita"
            alt="Reprogramar cita"
          />
        </div>
      </div>
      <div>
        <div className="p-2 text-center">
          <div className="mb-4">
            <button
              className="btn btn-primary btn--agendar"
              onClick={reprogramarCita}
            >
              Reprogramar cita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReprogramarCita;
