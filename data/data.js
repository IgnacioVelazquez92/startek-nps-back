const XSLX = require("xlsx");
const path = require("path");

const leerExcel = () => {
  const filePath = path.join(__dirname, "../baseNPS.xlsx");
  const workbook = XSLX.readFile(filePath);
  const workBookSheets = workbook.SheetNames;

  // console.log(workBookSheets);

  const sheet = workBookSheets[0];
  const dataExcel = XSLX.utils.sheet_to_json(workbook.Sheets[sheet]);

  return dataExcel;
};

module.exports = {
  leerExcel,
};
