const { parseQuery } = require('./queryParser');
const { readCSV } = require('./csvReader');

module.exports.executeSELECTQuery = async(query) => {
    const { fields, table } = parseQuery(query);
    const data = await readCSV(`${table}.csv`);

    return data.map(row => {
        const filterRow = {};
        fields.forEach(field => {
            filterRow[field] = row[field];
        });
        return filterRow;
    })
}