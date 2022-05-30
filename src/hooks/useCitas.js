import { useEffect, useState } from 'react';
import { getCitasUsuario } from '../services/citas.services';

const useCitas = ({ cedula = '12399102' }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getCitas = async () => {
      setLoading(true);
      try {
        const response = await getCitasUsuario(cedula);
        setData(response.data.citas);
      } catch (error) {
        setIsError(true);
      }
      setLoading(false);
    };
    getCitas();
  }, [cedula]);

  return { data, loading, isError };
};

export default useCitas;
