import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuthState } from '../context/authContext';
import { loginService } from '../services/auth.services';
import '../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const { login, auth } = useAuthState();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else {
      setClave(value);
    }
  };

  /**
   * Es una función que maneja el envío de un formulario, y lo hace impidiendo la acción por defecto
   * del formulario, luego intenta iniciar la sesión del usuario llamando a la función loginService, y si
   * tiene éxito, inicia la sesión del usuario y navega a la página de inicio, de lo contrario alerta al usuario de que
   * el correo electrónico o la contraseña son incorrectos
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginService(clave, email);
      login(response.data);
      navigate('/home');
    } catch (error) {
      alert('Correo electronico o clave incorrecta');
    }
  };

  /* Comprobación de si el usuario está autentificado, si es así, redirige a la página de inicio.  */
  if (auth) {
    return <Navigate to={'/home'} />;
  }

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img
                src="images/fondo-login.jpg"
                alt="Login image"
                className="w-100 vh-100"
                style={{ objectFit: 'cover', objectPosition: 'right' }}
              />
            </div>
            <div className="col-sm-6 text-black">
              <div className="d-flex align-items-center px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form
                  className="fondo--form border p-5 mt-4"
                  style={{ width: '30rem' }}
                  onSubmit={handleSubmit}
                >
                  <h3
                    className="fw-normal mb-3 pb-3 text-center"
                    style={{ letterSpacing: '1px' }}
                  >
                    Iniciar sesión
                  </h3>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form2Example18"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="form2Example18">
                      Correo electrónico
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form2Example28"
                      name="clave"
                      value={clave}
                      onChange={handleInputChange}
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="form2Example28">
                      Contraseña
                    </label>
                  </div>

                  <div className="pt-1 mb-4 text-center">
                    <button
                      className="btn btn-lg btn-block btn--ingresar"
                      type="submit"
                    >
                      Ingresar
                    </button>
                  </div>

                  <p className="text-center">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/registro">
                      <a className="link--registro">Regístrate</a>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
