const ordenarPorFecha = (a, b) => {
  const fecha1 = new Date(a.fechaHora);
  const fecha2 = new Date(b.fechaHora);

  if (fecha1 < fecha2) {
    return 1;
  }
  if (fecha1 > fecha2) {
    return -1;
  }
  return 0;
};

export default ordenarPorFecha;
