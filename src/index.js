const { parseQuery } = require("./queryParser");
const { readCSV } = require("./csvReader");

module.exports.executeSELECTQuery = async (query) => {
  const { fields, table, whereClause } = parseQuery(query);
  const data = await readCSV(`${table}.csv`);

  //Filtering based on WHERE Clause
  const filteredData = whereClause
    ? data.filter((row) => {
        const [field, value] = whereClause.split("=").map((s) => s.trim());
        return (row[field] === value);
      })
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
