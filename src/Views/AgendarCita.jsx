import { useRef, useState } from 'react';
import { getCitasByDay, createCita } from '../services/citas.services';
import { useAuthState } from '../context/authContext';
import '../styles/agendarCita.css';
import mapHoras from '../utils/mapHoras';

const AgendarCita = () => {
  const { user } = useAuthState();
  const fechaSeleccionada = useRef(null);
  const motivoInput = useRef(null);
  const horaSeleccionada = useRef(null);
  const [horas, setHoras] = useState(mapHoras);
  const [isFechaSeleccionada, setIsFechaSeleccionada] = useState(false);

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

  const agendarCita = async () => {
    const fecha = fechaSeleccionada.current.value;
    const hora = horaSeleccionada.current.value;
    const motivo = motivoInput.current.value;

    const fechaHora = `${fecha} ${hora}:00:00`;
    const fechaHoraFormato = new Date(fechaHora).toISOString();

    try {
      const response = await createCita({
        motivo,
        fechaHora: fechaHoraFormato,
        idPaciente: user.id
      });

      console.log(response);
      fechaSeleccionada.current.value = '';
      motivoInput.current.value = '';
      horaSeleccionada.current.value = '8';
      setIsFechaSeleccionada(false);
      alert('Cita agendada');
    } catch (error) {
      alert('Error al agendar la cita');
    }
  };

  return (
    <div className="container d-flex flex-column mb-3 justify-content-center mt-5 mb-5 p-5 agendar--cita">
      <div className="d-flex flex-row justify-content-center flex-wrap">
        <div className="p-2">
          <form>
            <div className="mb-4">
              <h2>Agendar cita</h2>
            </div>
            <div className="mb-3">
              <label htmlFor="formMotivo" className="form-label">
                Motivo:
              </label>
              <textarea
                className="form-control"
                id="formMotivo"
                ref={motivoInput}
                rows="3"
              ></textarea>
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
            src="../images/img-agendar-cita.png"
            className="img-fluid"
            alt="Agendar cita"
          />
        </div>
      </div>
      <div>
        <div className="p-2 text-center">
          <div className="mb-4">
            <button
              className="btn btn-primary btn--agendar"
              onClick={agendarCita}
            >
              Agendar cita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendarCita;
