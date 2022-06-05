import '../styles/Landing.css';

/**
 * Devuelve un div con una clase de banner, y dentro de ese div, devuelve un h1 y un h2
 * @returns Un div con una clase de banner y texto-centro.
 */
const Landing = () => {
  return (
    <div className="banner text-center">
      <h1>Dentis Web</h1>
      <h2>
        Dentis Web es una aplicación web que te permite agendar citas con tus
        ortodoncistas.
      </h2>
    </div>
  );
};

export default Landing;
