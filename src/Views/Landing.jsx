import Button from '../Components/Button';
import '../styles/Landing.css';

const Landing = () => {
  return (
    <main className="main">
      <section className="main__contents">
        <p className="main__description">
          Una sonrisa perfecta comienza aquí. Descubre la excelencia en
          ortodoncia y reserva tu cita ahora mismo.
        </p>
        <div className="main__buttons">
          <Button
            route={'/login'}
            text={'Iniciar sesión'}
            bgColor={'primary'}
          />
          <Button
            route={'/register'}
            text={'Registrarme'}
            bgColor={'secondary'}
          />
        </div>
      </section>
      <figure className="main__figure">
        <img
          src="/images/illustration-landing-200.svg"
          alt=""
          className="main__illustration"
        />
      </figure>
    </main>
  );
};

export default Landing;
