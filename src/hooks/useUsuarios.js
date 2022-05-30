import { useEffect, useState } from 'react';
import { getUsuarios } from '../services/usuarios.services';

const useUsuarios = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getUsuarios();
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setIsError(true);
      }
    };
    fetchData();
  }, []);

  return { data, loading, isError };
};

export default useUsuarios;
