import Button from './Button';
import '../styles/MainLanding.css';

const MainLanding = () => {
  return (
    <main className="main">
      <p className="main__description">
        Una sonrisa perfecta comienza aquí. Descubre la excelencia en ortodoncia
        y reserva tu cita ahora mismo.
      </p>
      <figure className="main__figure">
        <img
          src="/images/illustration-landing-200.svg"
          alt=""
          className="main__illustration"
        />
      </figure>
      <div className="main__buttons">
        <Button route={'/login'} text={'Iniciar sesión'} bgColor={'primary'} />
        <Button
          route={'/register'}
          text={'Registrarme'}
          bgColor={'secondary'}
        />
      </div>
    </main>
  );
};

export default MainLanding;
