import { useState } from 'react';
import '../styles/agregarSecretario.css';
import { registerService } from '../services/auth.services';

const VALOR_INICIAL = {
  nombre: '',
  cedula: '',
  email: '',
  telefono: '',
  clave: ''
};

const AgregarSecretario = () => {
  const [newSecretario, setNewSecretario] = useState(VALOR_INICIAL);

  const handleChange = (e) => {
    setNewSecretario({
      ...newSecretario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      await registerService({
        ...newSecretario,
        rol: 'SECRETARIO'
      });

      alert('Secretario agregado correctamente');
      setNewSecretario(VALOR_INICIAL);
    } catch (error) {
      alert('Correo electronico ya está registrado');
    }
  };

  return (
    <div className="container d-flex flex-column mb-3 justify-content-center mt-5 mb-5 p-5 agendar--cita">
      <div className="d-flex flex-row justify-content-center  flex-wrap">
        <div className="p-2">
          <div className="mb-4">
            <h2>Agregar secretario</h2>
          </div>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Andres Vizcaino"
                value={newSecretario.nombre}
                onChange={handleChange}
                name="nombre"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput2" className="form-label">
                Correo electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="pepito@mail.com"
                value={newSecretario.email}
                onChange={handleChange}
                name="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput5" className="form-label">
                Cedula
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput5"
                placeholder="12312412"
                value={newSecretario.cedula}
                onChange={handleChange}
                name="cedula"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput3" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleFormControlInput3"
                placeholder="Contraseña"
                value={newSecretario.clave}
                onChange={handleChange}
                name="clave"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput4" className="form-label">
                Telefono
              </label>
              <input
                type="tel"
                className="form-control"
                id="exampleFormControlInput4"
                placeholder="+57912345678"
                value={newSecretario.telefono}
                onChange={handleChange}
                name="telefono"
              />
            </div>
          </form>
        </div>
        <div className="p-2 img--agenda">
          <img
            src="../images/secretario-img.png"
            className="img-fluid"
            alt="Agendar cita"
          />
        </div>
      </div>
      <div>
        <div className="p-2 text-center">
          <div className="mb-4">
            <button
              className="btn btn-primary btn--agregar"
              onClick={handleSubmit}
            >
              Agregar secretario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarSecretario;
