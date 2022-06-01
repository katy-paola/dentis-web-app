import { useState } from 'react';
import { useAuthState } from '../context/authContext';
import { actualizarUsuario } from '../services/usuarios.services';
import '../styles/modificarPerfil.css';

const ModificarPerfil = () => {
  const { user, login } = useAuthState();
  const [currentUser, setCurrentUser] = useState({ ...user, clave: '' });

  const handleChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    try {
      await actualizarUsuario({
        id: currentUser.id,
        nombre: currentUser.nombre,
        email: currentUser.email,
        cedula: currentUser.cedula,
        telefono: currentUser.telefono,
        clave: currentUser.clave
      });
      login(currentUser);
      alert('Tu perfil ha sido actualizado con éxito!!');
    } catch (error) {
      console.log('Error al actualizar tu usuario...');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <div className="card mb-4 card--paciente">
            <div className="card-body text-center">
              <img
                src="../images/foto-perfil.png"
                alt="avatar"
                className="rounded-circle img-fluid"
                style={{ width: 150 }}
              />
              <div className="my-3">
                <label htmlFor="exampleInputNombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputNombre"
                  value={currentUser.nombre}
                  name="nombre"
                  onChange={handleChange}
                />
              </div>
              <p className="text-muted mb-1">{currentUser.rol}</p>
              <div className="my-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={currentUser.email}
                  name="email"
                  onChange={handleChange}
                />
              </div>

              <div className="my-3">
                <label htmlFor="exampleInputCedula" className="form-label">
                  Cedula
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputCedula"
                  value={currentUser.cedula}
                  name="cedula"
                  onChange={handleChange}
                />
              </div>

              <div className="my-3">
                <label htmlFor="exampleInputtelefono" className="form-label">
                  Telefono
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputtelefono"
                  value={currentUser.telefono}
                  name="telefono"
                  onChange={handleChange}
                />
              </div>

              <div className="my-3">
                <label htmlFor="exampleInputClave" className="form-label">
                  Cambiar contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputClave"
                  name="clave"
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-center mb-2">
                <button
                  onClick={saveChanges}
                  type="button"
                  className="btn btn-info btn-sm"
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModificarPerfil;
