import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCitasUsuario } from '../services/citas.services';

const CardPaciente = ({ nombre, email, cedula }) => {
  const [numberCitas, setNumberCitas] = useState(0);

  useEffect(() => {
    const getCitas = async () => {
      const response = await getCitasUsuario(cedula);
      setNumberCitas(response.data.citas.length);
    };
    getCitas();
  }, [cedula]);

  return (
    <div className="h-100">
      <div
        className="row d-flex justify-content-center align-items-center h-100"
        style={{ width: 500 }}
      >
        <div className="card" style={{ borderRadius: 15 }}>
          <div className="card-body p-4">
            <div className="d-flex text-black">
              <div className="flex-shrink-0">
                <img
                  src={'../images/foto-perfil.png'}
                  alt="Generic placeholder image"
                  className="img-fluid"
                  style={{ width: 180, borderRadius: 10 }}
                />
              </div>
              <div className="flex-grow-1 ms-3">
                <h5 className="mb-1">{nombre}</h5>
                <p className="mb-2 pb-1" style={{ color: '#2b2a2a' }}>
                  {email}
                </p>
                <div
                  className="d-flex justify-content-start rounded-3 p-2 mb-2"
                  style={{ backgroundColor: '#efefef' }}
                >
                  <div>
                    <p className="small text-muted mb-1"># Citas</p>
                    <p className="mb-0">{numberCitas}</p>
                  </div>
                </div>
                <div className="d-flex pt-1">
                  <Link to={`/view-paciente/${cedula}`}>
                    <a className="btn btn-outline-primary me-1 flex-grow-1">
                      Ver citas
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPaciente;
