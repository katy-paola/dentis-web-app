import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import './styles/index.css';

/**
 * La función App devuelve un componente Header y un elemento principal que contiene un componente Outlet
 * @returns El componente de cabecera y el componente de salida.
 */
const App = () => {
  return (
    <>
      <div className="container">
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default App;
