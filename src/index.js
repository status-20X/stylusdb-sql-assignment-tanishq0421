const { parseQuery } = require("./queryParser");
const { readCSV } = require("./csvReader");

module.exports.executeSELECTQuery = async (query) => {
  const { fields, table, whereClauses } = parseQuery(query);
  const data = await readCSV(`${table}.csv`);

  //Filtering based on WHERE Clause
  const filteredData = whereClauses.length > 0
    ? data.filter((row) => whereClauses.every(clause => {
        return (row[clause.field] === clause.value);
      }))
    : data;

  // Selecting the specific fields
  return filteredData.map((row) => {
    const selectedRow = {};
    fields.forEach((field) => {
      selectedRow[field] = row[field];
    });
    return selectedRow;
  });
};
