import { Navigate, useNavigate } from 'react-router-dom';
import { registerService } from '../services/auth.services';
import { useAuthState } from '../context/authContext';

const Register = () => {
  const { login, auth } = useAuthState();
  const navigate = useNavigate();

  /**
   * Funcion para registar un usuario
   */
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerService({
        nombre: e.target.nombre.value,
        cedula: e.target.cedula.value,
        email: e.target.email.value,
        telefono: e.target.telefono.value,
        clave: e.target.clave.value
      });
      login(response.data);
      navigate('/home');
    } catch (error) {
      alert('Correo electronico ya esta registrado');
    }
  };

  /* Comprobación de si el usuario está autentificado, si es así, redirige a la página de inicio.  */
  if (auth) {
    return <Navigate to={'/home'} />;
  }

  return (
    <section
      className="vh-100 overflow-auto"
      style={{ backgroundColor: '#eee' }}
    >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: 25 }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Registro
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={onSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="formNombre"
                            className="form-control"
                            name="nombre"
                          />
                          <label className="form-label" htmlFor="formNombre">
                            Tu Nombre
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="formCedula"
                            className="form-control"
                            name="cedula"
                          />
                          <label className="form-label" htmlFor="formCedula">
                            Tu Cédula
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="formEmail"
                            className="form-control"
                            name="email"
                          />
                          <label className="form-label" htmlFor="formEmail">
                            Tu Email
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="tel"
                            id="formTelefono"
                            className="form-control"
                            name="telefono"
                          />
                          <label className="form-label" htmlFor="formTelefono">
                            Tu Teléfono
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="formClave"
                            name="clave"
                            className="form-control"
                          />
                          <label className="form-label" htmlFor="formClave">
                            Clave
                          </label>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Registrarme
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://img.freepik.com/vector-gratis/lindo-gato-donut-estilo-dibujos-animados-plana_138676-2624.jpg?t=st=1653535469~exp=1653536069~hmac=e803ed07ecd57cd6c9b2e40aa99b272fee3c83cb6279a46ae0c90a94dfa66920&w=826"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
