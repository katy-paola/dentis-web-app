const compararFechas = (fecha1, fecha2) => {
  var f1 = new Date(fecha1);
  var day = new Date(fecha2).getUTCDate();
  var month = new Date(fecha2).getUTCMonth();
  var year = new Date(fecha2).getUTCFullYear();

  var f2 = new Date(year, month, day);

  f1.setHours(0, 0, 0, 0);
  f2.setHours(0, 0, 0, 0);
  if (f1.getTime() == f2.getTime()) {
    return true;
  }
  return false;
};

export default compararFechas;
