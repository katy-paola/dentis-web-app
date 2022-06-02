import { Link, NavLink } from 'react-router-dom';
import '../styles/header.css';
import { useAuthState } from '../context/authContext';

const Header = () => {
  const { auth, logout, user } = useAuthState();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to={'/'}>
            Dentis-Web
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {auth ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to={'/home'} className="nav-link">
                    <span className="icon-home"></span>
                    <span className="item">Inicio</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/mi-perfil'} className="nav-link">
                    <span className="icon-user"></span>
                    <span className="item">Mi Perfil</span>
                  </NavLink>
                </li>
                {user.rol === 'PACIENTE' && (
                  <li className="nav-item">
                    <NavLink to={'/agendar-cita'} className="nav-link">
                      <span className="icon-address-book"></span>
                      <span className="item">Agendar Cita</span>
                    </NavLink>
                  </li>
                )}
                {user.rol === 'ADMIN' && (
                  <li className="nav-item">
                    <NavLink to={'/agregar-secretario'} className="nav-link">
                      <span className="icon-address-book"></span>
                      <span className="item">Agregar secretario</span>
                    </NavLink>
                  </li>
                )}
                <li className="nav-item ">
                  <NavLink to={'/nosotros'} className="nav-link">
                    <span className="icon-users"></span>
                    <span className="item">Nosotros</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/contacto'} className="nav-link">
                    <span className="icon-phone"></span>
                    <span className="item">Contacto</span>
                  </NavLink>
                </li>
              </ul>
            ) : (
              <div className="me-auto"></div>
            )}
            <div>
              {/* Aqui puede ir el nombre de la persona que inicia sesi[on] */}
              <span className="item">
                {auth ? (
                  <div className="d-flex align-items-center gap-3">
                    <span>
                      Bienvenido, <b>{user.nombre}</b>
                    </span>
                    <button className="btn btn-outline-danger" onClick={logout}>
                      Cerrar
                    </button>
                  </div>
                ) : (
                  <Link to={'/login'}>
                    <button className="btn btn--login">Iniciar Sesión</button>
                  </Link>
                )}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
