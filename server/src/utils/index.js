const DELIMITER = ";";
const EOL = "\r\n";

const jsonArrayToCSV = (jsonArr) => {
  if (jsonArr.length === 0) {
    return null;
  }

  const headerArr = Object.keys(jsonArr[0]);
  const headerStr = headerArr.join(";").concat(EOL);
  const result = jsonArr.reduce((accum, record) => {
    let tempStr = "";
    for (let i = 0; i < headerArr.length; i++) {
      tempStr += `${record[headerArr[i]]}${
        i === headerArr.length - 1 ? EOL : DELIMITER
      }`;
    }
    return `${accum}${tempStr}`;
  }, headerStr);

  return result;
};

module.exports = { jsonArrayToCSV };
