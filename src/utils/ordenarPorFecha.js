/**
 * Toma dos objetos y devuelve 1 si la fecha del primer objeto es mayor que la del segundo
 * fecha, -1 si la fecha del primer objeto es menor que la del segundo, y 0 si las fechas son
 * iguales
 * @param a - El primer elemento a comparar.
 * @param b - El segundo elemento que se compara.
 */
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
