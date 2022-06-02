import { useAuthState } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import '../styles/verPerfil.css';

const VerPerfil = () => {
  const { user } = useAuthState();
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <div className="card mb-4 card--paciente">
            <div className="card-body text-center">
              <img
                src="../images/foto-perfil.png"
                alt="avatar"
                className="rounded-circle img-fluid border"
                style={{ width: 150 }}
              />
              <h5 className="my-3">{user?.nombre}</h5>
              <p className="text-muted mb-1">{user?.rol}</p>
              <p className="text-muted mb-1">{user?.email}</p>
              <p className="text-muted mb-1">CC: {user?.cedula}</p>
              <p className="text-muted mb-4">{user?.telefono}</p>
              <div className="d-flex justify-content-center mb-2">
                <a
                  onClick={() => navigate('/modificar-perfil')}
                  type="button"
                  className="btn btn-info btn-sm"
                >
                  Editar perfil
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VerPerfil;
