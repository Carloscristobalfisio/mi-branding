/**
 * Guarda las respuestas de los cuestionarios (PSQI, etc.) en una hoja de Google Sheets.
 *
 * Instalación:
 * 1. Crea una hoja de cálculo nueva en Google Sheets (p. ej. "Respuestas cuestionarios").
 * 2. Menú Extensiones → Apps Script. Borra lo que haya y pega este archivo. Guarda.
 * 3. Implementar → Nueva implementación → tipo "Aplicación web".
 *      Ejecutar como: Yo
 *      Quién tiene acceso: Cualquier usuario
 * 4. Autoriza los permisos y copia la URL que termina en /exec.
 * 5. Pega esa URL en la variable ENDPOINT de cuestionarios/psqi.html.
 */
var COLUMNAS = ["recibido", "cuestionario", "nombre", "edad", "fecha", "total",
  "c1", "c2", "c3", "c4", "c5", "c6", "c7", "eficiencia", "resumen"];

function doPost(e) {
  var datos = JSON.parse(e.postData.contents);
  datos.recibido = new Date();
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(datos.cuestionario || "Respuestas")
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet(datos.cuestionario || "Respuestas");
  if (hoja.getLastRow() === 0) hoja.appendRow(COLUMNAS);
  hoja.appendRow(COLUMNAS.map(function (c) { return datos[c] !== undefined ? datos[c] : ""; }));
  return ContentService.createTextOutput("ok");
}
